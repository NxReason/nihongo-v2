from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/kanji"
)

class InKanji(BaseModel):
    glyph: str
    en: str

class OutKanji(BaseModel):
    id: int
    glyph: str
    en: str

kanji = [
        { 'id': 1, 'glyph': 'hito', 'en': 'person' },
        { 'id': 2, 'glyph': 'tsuki', 'en': 'moon' },
        { 'id': 3, 'glyph': 'inu', 'en': 'dog' },
        ]

@router.get('/')
def all():
    return kanji

@router.get('/{id}')
def one(id: int):
    k = next((k for k in kanji if k['id'] == id), None)
    if not k:
        return {}
    return k

@router.post('/')
def create(in_kanji: InKanji) -> OutKanji:
    new_id = kanji[len(kanji) - 1]['id'] + 1
    out_kanji = OutKanji(id=new_id, **in_kanji.model_dump())
    kanji.append({ **out_kanji.model_dump() })
    return out_kanji

@router.put('/{id}')
def update(id: int, in_kanji: InKanji):
    upd_kanji = next((k for k in kanji if k['id'] == id), None)
    if not upd_kanji:
        return {}
    upd_kanji.update(**in_kanji.model_dump())
    return upd_kanji

@router.post('/{id}')
def delete(id: int):
    idx, rm_kanji = next(((i, k) for i, k in enumerate(kanji) if k['id'] == id), (None, None))
    print(idx, rm_kanji)
    if idx is None:
        return {}
    del kanji[idx]
    return rm_kanji
