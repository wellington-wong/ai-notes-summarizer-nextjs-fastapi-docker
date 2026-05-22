from pydantic import BaseModel




class NoteCreate(BaseModel):
	content: str

class NoteResponse(BaseModel):
	id: int
	content: str
	summary: str | None = None

	class Config:
		from_attributes = True