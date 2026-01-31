from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from server.models import db
from server.models.Kanji import Kanji, KanjiForm

router = APIRouter(
    prefix="/kanji"
)

@router.get('/')
def all(db: Session = Depends(db.get)):
    all_kanji = db.scalars(select(Kanji)).all();
    return all_kanji

@router.post('/')
def create(in_kanji: KanjiForm):
    ...

@router.put('/{id}')
def update(id: int):
    ...

@router.post('/{id}')
def delete(id: int):
    ...
