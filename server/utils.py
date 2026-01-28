from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
        'http://localhost:5173'
        ]

def enable_cors(app: FastAPI):
    app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=['*'],
            allow_headers=['*']
            )
