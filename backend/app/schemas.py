from pydantic import BaseModel, EmailStr, Field




class NoteCreate(BaseModel):
	user_id: int
	content: str

class NoteResponse(BaseModel):
	id: int
	content: str
	summary: str | None = None

		
	class Config:	
		from_attributes = True

class UserCreate(BaseModel):
	email: EmailStr
	password: str = Field(min_length=8, max_length=128)

class UserResponse(BaseModel):
	id: int

	email: EmailStr
	role: str
	is_active: bool

	model_config = {
		"from_attributes": True
	}