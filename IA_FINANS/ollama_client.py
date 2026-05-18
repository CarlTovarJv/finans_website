import requests

def generar_datos(prompt):

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={

            "model": "qwen2.5:3b",

            "prompt": prompt,

            "stream": False,

            "temperature": 0

        }
    )

    return response.json()["response"]