from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session


from ..auth import hash_password
from ..database import SessionLocal
from ..schemas import UserCreate, UserResponse


router = APIRouter(
	prefix="/auth",
	tags=["auth"],

)

def get_db():
	db = SessionLocal()

	try:
		yield db
	finally:
		db.close()


@router.post(
	"/register",
	response_model=UserResponse,
	status_code=status.HTTP_201_CREATED,
)
def register(
	user: UserCreate,
	db: Session = Depends(get_db),

):
	existing_user = (
		db.query(User)
		.filter(User.email == user.email)
		.first()
	)

	if existing_user:
		raise HTTPException(

			status_code=status.HTTP_409_CONFLICT,
			detail="Unable to create account.",
		)

	db_user = User(
		email=user.email,
		password_hash=hash_password(user.password),
		role="user",
	)


	db.add(db_user)
	db.commit()
	db.refresh(db_user)

	return db_user