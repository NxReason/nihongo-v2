from contextlib import asynccontextmanager
from fastapi import FastAPI

from server.models import db, populate
from server.routes import kanji
from server.utils import enable_cors
from server.config import get_settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    db.init(settings)
    populate.populate(settings.env)
    yield

app = FastAPI(lifespan=lifespan)

enable_cors(app)

app.include_router(kanji.router, prefix="/api")

@app.get('/')
def root():
    return { 'hello': 'world' }
