from pathlib import Path

import sentry_sdk

from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

from app.api.main import api_router
from app.core.config import settings

from contextlib import asynccontextmanager
from pydantic import BaseModel

from langchain.agents import create_agent






if settings.SENTRY_DSN and settings.FASTAPI_ENV != "development":
    sentry_sdk.init(dsn=str(settings.SENTRY_DSN), enable_tracing=True)


def get_weather(city: str) -> str:
    """Get the weather for a city."""
    return f"It's always sunny in {city}!"

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.agent = create_agent(
        model="anthropic:claude-sonnet-5",
        tools=[get_weather],
    )
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    #generate_unique_id_function=custom_generate_unique_id,
    lifespan=lifespan

)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_HOST],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(api_router, prefix=settings.API_V1_STR)
#app.frontend("/", directory=FRONTEND_DIR)


class ChatIn(BaseModel):
    message: str

@app.post("/chat")
async def chat(body: ChatIn):
    result = await app.state.agent.ainvoke(
        {"messages": [{"role": "user", "content": body.message}]}
    )

    return {"reply": result["messages"][-1].content}