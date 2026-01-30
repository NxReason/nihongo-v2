from contextlib import asynccontextmanager
from fastapi import FastAPI

from server.models import db, populate
from server.routes import kanji
from server.utils import enable_cors
from server.config import get_settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    db.init(settings)
    populate.populate(settings.env)
    yield

app = FastAPI(lifespan=lifespan)
settings = get_settings()

enable_cors(app, settings.env)

app.include_router(kanji.router, prefix="/api")

@app.get('/')
def root():
    return { 'hello': 'world' }
