import os
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer

auth_scheme = OAuth2PasswordBearer(tokenUrl='login')
# exp_mins = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
sec_key = os.getenv("SECRET_KEY")
algo = os.getenv("ALGORITHM")
# print("SECRET_KEY:", sec_key)
# print("ALGORITHM:", algo)
# def create_access_token(data: dict) :
#     d_copy = data.copy()
#     expire = datetime.now(timezone.utc)+timedelta(minutes=exp_mins)

#     d_copy.update({"exp":expire})

#     token = jwt.encode(d_copy, sec_key, algorithm=algo)

#     return token

# def verify_token(token: str, error): 
#     try:
#         print(jwt.get_unverified_header(token))
#         payload = jwt.decode(token, sec_key, algorithms=[algo])
#         id: str = payload.get("sub")

#         if id==None:
#             raise error

#         return id

#     except JWTError:
#         raise error

# def get_cur_user(token: str = Depends(auth_scheme)):
#     error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Couldn't verify credentials.")

#     return verify_token(token, error)

import os
import httpx

from jose import JWTError, jwt
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer


auth_scheme = OAuth2PasswordBearer(tokenUrl="login")

SUPABASE_URL = os.getenv("SUPABASE_URL")

JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"
SUPABASE_ISSUER = f"{SUPABASE_URL}/auth/v1"


def verify_token(token: str, error):
    try:
        # Get Supabase public signing keys
        response = httpx.get(
            JWKS_URL,
            timeout=5.0
        )

        response.raise_for_status()

        jwks = response.json()

        # Read JWT header
        header = jwt.get_unverified_header(token)

        kid = header.get("kid")

        if not kid:
            raise error

        # Find the public key used to sign this token
        key = next(
            (
                key
                for key in jwks["keys"]
                if key.get("kid") == kid
            ),
            None
        )

        if key is None:
            raise error

        # Verify the Supabase JWT
        payload = jwt.decode(
            token,
            key,
            algorithms=["ES256"],
            audience="authenticated",
            issuer=SUPABASE_ISSUER
        )

        # Supabase stores the user's UUID in "sub"
        user_id = payload.get("sub")

        if user_id is None:
            raise error

        return user_id

    except (
        JWTError,
        httpx.HTTPError,
        KeyError,
        TypeError
    ):
        raise error


def get_cur_user(token: str = Depends(auth_scheme)):
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Couldn't verify credentials."
    )

    return verify_token(token, error)