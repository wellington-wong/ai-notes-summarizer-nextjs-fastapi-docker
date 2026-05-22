from sqlalchemy import Column
from sqlalchemy import Integer



from sqlalchemy import String

from .database import Base

class Note(Base):
	__tablename__ = "notes"

	id = Column(Integer, primary_key=True, index=True)
	content = Column(String)
	summary = Column(String, nullable=True)

	