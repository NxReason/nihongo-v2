from sqlalchemy import create_engine, Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from server.config import Settings

class Base(DeclarativeBase):
    pass

engine: Engine = None # type: ignore
SessionLocal = None

def init(settings: Settings):
    global engine, SessionLocal
    conn_str = _make_conn_str(settings)
    engine = create_engine(conn_str)
    SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)
    if settings.env in ('dev', 'test'):
        Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def get():
    db = SessionLocal() # type: ignore
    try:
        yield db
    finally:
        db.close()

def _make_conn_str(settings: Settings) -> str:
    user, password = (settings.db_user, settings.db_pass)
    db, host, port = (settings.db_name, settings.db_host, settings.db_port)
    return f'postgresql://{user}:{password}@{host}:{port}/{db}'

