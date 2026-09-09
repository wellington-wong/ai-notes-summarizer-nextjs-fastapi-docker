from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship


from sqlalchemy.sql import func
from .database import Base

class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	email = Column(String, unique=True, index=True, nullable=False)
	password_hash = Column(String, nullable = False)

	role = Column(String, nullable=False, default="user")
	is_active = Column(Boolean, nullable=False, default=True)

	created_at = Column(
		DateTime(timezone=True),
		server_default=func.now(),
		nullable=False,
	)


	updated_at = Column(
		DateTime(timezone=True),
		server_default=func.now(),
		onupdate=func.now(),
		nullable=False
	)

	notes = relationship(
		"Note",

		back_populates="user",
		cascade="all, delete-orphan",
	)

class Note(Base):
	__tablename__ = "notes"

	id = Column(Integer, primary_key=True, index=True)



	user_id = Column(
		Integer,
		ForeignKey("users.id"),
		nullable=False,
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



	user = relationship(
		"User",
		back_populates="notes",

	)

	