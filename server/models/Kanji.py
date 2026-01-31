from pydantic import BaseModel
from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ARRAY

from server.models.db import Base

class Kanji(Base):
    __tablename__ = 'kanji'

    id: Mapped[int] = mapped_column(primary_key=True)
    glyph: Mapped[str] = mapped_column(unique=True)
    on_readings: Mapped[list[str]] = mapped_column(ARRAY(String))
    kun_readings: Mapped[list[str]] = mapped_column(ARRAY(String))
    meanings: Mapped[list[str]] = mapped_column(ARRAY(String))

class KanjiForm(BaseModel):
    glyph: str
    on_readings: list[str]
    kun_readings: list[str]
    meanings: list[str]
