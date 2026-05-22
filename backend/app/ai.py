import os
from openai import OpenAI



client = OpenAI(
	api_key=os.getenv("OPENAI_API_KEY")
)

def summarize_text(text: str) -> str:
	response = client.chat.completions.create(
		model="gpt-5-mini",
		messages = [
			{
				"role": "user",
				"content": f"Summarize this in one sentence:\n\n{text}"
			}
		]
	)

	return response.choices[0].message.content