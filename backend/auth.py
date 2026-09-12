import os
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer

auth_scheme = OAuth2PasswordBearer(tokenUrl='login')
exp_mins = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
sec_key = os.getenv("SECRET_KEY")
algo = os.getenv("ALGORITHM")

# def create_access_token(data: dict) :
#     d_copy = data.copy()
#     expire = datetime.now(timezone.utc)+timedelta(minutes=exp_mins)

#     d_copy.update({"exp":expire})

#     token = jwt.encode(d_copy, sec_key, algorithm=algo)

#     return token

def verify_token(token: str, error): 
    try:
        payload = jwt.decode(token, key=sec_key, algorithms=algo)
        id: str = payload.get("user_id")

        if id==None:
            raise error

        return id

    except JWTError:
        raise error

def get_cur_user(token: str = Depends(auth_scheme)):
    error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Couldn't verify credentials.")

    return verify_token(token, error)