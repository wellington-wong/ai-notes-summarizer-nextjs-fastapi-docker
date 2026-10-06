
from langchain.agents import create_agent


def get_weather(city: str) -> str:
    """Get the weather for a city."""
    return f"It's always sunny in {city}!"

agent = create_agent(
    model="anthropic:claude-sonnet-5",
    tools=[get_weather],
    system_prompt="You are a helpful assistant.",
)


result = agent.invoke({"messages": [{"role": "user", "content": "What's the weather in Dubai?"}]})
print(result["messages"][-1].content)