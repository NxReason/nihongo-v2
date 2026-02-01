from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from server.models import db
from server.models.Word import Word, WordForm

router = APIRouter(
    prefix="/words"
)

@router.get('/')
def all(db: Session = Depends(db.get)):
    all_words = db.scalars(select(Word).order_by('id')).all();
    return all_words

@router.post('/')
def create(in_word: WordForm, db: Session = Depends(db.get)):
    try:
        new_word = Word(**in_word.model_dump())
        db.add(new_word)
        db.commit()
        db.refresh(new_word)
        return new_word
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, detail='Invalid word data')

@router.put('/{id}')
def update(id: int, in_word: WordForm, db: Session = Depends(db.get)):
    try:
        upd_word = db.get(Word, id)
        if not upd_word:
            raise HTTPException(404, detail=f"Can't find word with id {id}")
        for k, v in in_word:
            if k != 'id': setattr(upd_word, k, v)
        db.commit()
        db.refresh(upd_word)
        return upd_word
    except IntegrityError:
        db.rollback()
        raise HTTPException(400, detail='Invalid word data')

@router.delete('/{id}')
def delete(id: int, db: Session = Depends(db.get)):
    del_word = db.get(Word, id)
    if not del_word:
        raise HTTPException(404, detail=f"Can't find word with id={id} to delete")
    db.delete(del_word)
    db.commit()
    return del_word

