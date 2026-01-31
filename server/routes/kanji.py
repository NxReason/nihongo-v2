from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
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
def create(in_kanji: KanjiForm, db: Session = Depends(db.get)):
    try:
        new_kanji = Kanji(**in_kanji.model_dump())
        db.add(new_kanji)
        db.commit()
        db.refresh(new_kanji)
        return new_kanji
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, detail='Invalid kanji data')

@router.put('/{id}')
def update(id: int, in_kanji: KanjiForm, db: Session = Depends(db.get)):
    try:
        upd_kanji = db.get(Kanji, id)
        if not upd_kanji:
            raise HTTPException(404, detail=f"Can't find kanji with id {id}")
        for k, v in in_kanji:
            if k != 'id': setattr(upd_kanji, k, v)
        db.commit()
        db.refresh(upd_kanji)
        return upd_kanji
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, detail='Invalid kanji data')

@router.delete('/{id}')
def delete(id: int, db: Session = Depends(db.get)):
    del_kanji = db.get(Kanji, id)
    if not del_kanji:
        raise HTTPException(404, detail=f"Can't find kanji with id={id} to delete")
    db.delete(del_kanji)
    db.commit()
    return del_kanji
