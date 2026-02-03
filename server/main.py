from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from server.models import db, populate
from server.routes import kanji, words, pages
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

app.mount('/public', StaticFiles(directory="static/public"), name="public")

app.include_router(pages.router)
app.include_router(kanji.router, prefix="/api")
app.include_router(words.router, prefix="/api")

