from dotenv import load_dotenv
import os
import re

from groq import Groq
import base64

load_dotenv()

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(
    api_key=GROQ_API_KEY,
)

assistant_prompt = f"You are an assistant that evaluates how well a thumbnail matches YouTube video description. \
                    Provide score how good the thumbnail describes the video between 1 and 10, \
                    where 1 means 'not relevant at all' and 10 means 'extremely well describe the video'. \
                    Use range from 1 to 10, if the image is not relevant at all (for example, showing text), show 1/10. \
                    Include a brief explanation of how to improve the thumbnail to make the score higher. \
                    You should show the score like Score: [score] and the explanation like Reason: [explanation]."

def eval_thumbnail_score(user_prompt: str, content: bytes, model: str = "llama-3.2-11b-vision-preview"):
    base64_image = base64.b64encode(content).decode('utf-8')
    completion = client.chat.completions.create(
        model=model,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": assistant_prompt + "\nUser video description:" + user_prompt,
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        },
                    },
                ]
            },
        ],
        temperature=0,
        max_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
    )

    if not completion.choices: return None, None

    content = completion.choices[0].message.content
    matches = [re.search(r'Score:\s*(\d+)', content), re.search(r'Reason:\s*(.*)\.', content, re.DOTALL)]
    return tuple([match.group(1) if match else None for match in matches])
