from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship


from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base









class Note(Base):
	__tablename__ = "notes"

	id = Column(Integer, primary_key=True, index=True)



	user_id = Column(
		Integer,
		nullable=True,
		index=True,
	)

	content = Column(Text, nullable=False)

	summary = Column(Text, nullable=True)

	created_at = Column(
		DateTime(timezone=True),
		server_default=func.now(),
		onupdate=func.now(),
		nullable=False,
	)




	