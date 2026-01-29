from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    env: str = 'prod'
    db_name: str
    db_user: str
    db_pass: str
    db_host: str = 'localhost'
    db_port: int = 5432

    model_config = SettingsConfigDict(env_file=".env")

@lru_cache
def get_settings():
    return Settings() # type: ignore
