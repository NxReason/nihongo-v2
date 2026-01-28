from fastapi import FastAPI

from server.routes import kanji
from server.utils import enable_cors

app = FastAPI()

enable_cors(app)

app.include_router(kanji.router)

@app.get('/')
def root():
    return { 'hello': 'world' }
