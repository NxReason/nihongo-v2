from sqlalchemy import insert
from sqlalchemy.orm import Session
from server.models import db
from server.models.Kanji import Kanji

def populate(env: str):
    if env != 'dev': return
    populate_kanji()

kanji_data = [
    { 'glyph': '内', 'on_readings': ['nai', 'dai'], 'kun_readings': ['uchi'], 'meanings': ['inside', 'house'] },
    { 'glyph': '月', 'on_readings': ['getsu', 'gatsu'], 'kun_readings': ['tsuki'], 'meanings': ['moon', 'month'] },
    { 'glyph': '人', 'on_readings': ['jin', 'nin'], 'kun_readings': ['hito'], 'meanings': ['person'] },
    { 'glyph': '犬', 'on_readings': ['ken'], 'kun_readings': ['inu'], 'meanings': ['dog'] },
]
def populate_kanji():
    with Session(db.engine) as session:
        stmt = insert(Kanji).values(kanji_data)
        session.execute(stmt)
        session.commit()
