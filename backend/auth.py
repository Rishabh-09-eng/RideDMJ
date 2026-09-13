import os
import httpx
from jose import JWTError, jwt
from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer

auth_scheme = OAuth2PasswordBearer(tokenUrl="login")

SUPABASE_URL = os.getenv("SUPABASE_URL")
JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json" if SUPABASE_URL else ""
SUPABASE_ISSUER = f"{SUPABASE_URL}/auth/v1" if SUPABASE_URL else ""


def decode_supabase_payload(token: str, error: HTTPException) -> dict:
    try:
        response = httpx.get(
            JWKS_URL,
            timeout=5.0
        )
        response.raise_for_status()
        jwks = response.json()

        header = jwt.get_unverified_header(token)
        kid = header.get("kid")
        if not kid:
            raise error

        key = next(
            (k for k in jwks["keys"] if k.get("kid") == kid),
            None
        )
        if key is None:
            raise error

        payload = jwt.decode(
            token,
            key,
            algorithms=["ES256"],
            audience="authenticated",
            issuer=SUPABASE_ISSUER
        )
        return payload

    except (
        JWTError,
        httpx.HTTPError,
        KeyError,
        TypeError
    ):
        raise error


def verify_token(token: str, error: HTTPException) -> str:
    payload = decode_supabase_payload(token, error)
    user_id = payload.get("sub")
    if user_id is None:
        raise error
    return user_id


def get_cur_user(token: str = Depends(auth_scheme)) -> str:
    error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Couldn't verify credentials."
    )
    return verify_token(token, error)


def get_cur_admin(token: str = Depends(auth_scheme)) -> str:
    unauthorized_error = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Couldn't verify credentials."
    )
    forbidden_error = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="Access forbidden: Admin privileges required."
    )

    payload = decode_supabase_payload(token, unauthorized_error)

    # Check for admin role in app_metadata, user_metadata, or direct claim
    app_meta = payload.get("app_metadata", {})
    user_meta = payload.get("user_metadata", {})
    role = app_meta.get("role") or user_meta.get("role") or payload.get("role")

    if role != "admin":
        raise forbidden_error

    user_id = payload.get("sub")
    if not user_id:
        raise unauthorized_error

    return user_id