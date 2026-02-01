from pydantic import BaseModel
from sqlalchemy import CheckConstraint, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ARRAY

from server.models.db import Base

class Word(Base):
    __tablename__ = 'words'

    id: Mapped[int] = mapped_column(primary_key=True)
    jp: Mapped[str] = mapped_column(unique=True)
    reading: Mapped[str]
    meanings: Mapped[list[str]] = mapped_column(ARRAY(String))

    __table_args__ = (
        CheckConstraint('cardinality(meanings) > 0', name='word_meanings_not_empty_check'),
    )

class WordForm(BaseModel):
    jp: str
    reading: str
    meanings: list[str]
