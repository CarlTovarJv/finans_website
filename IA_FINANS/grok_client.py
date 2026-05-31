import os
from groq import Groq

# Inicializa el cliente de Groq
client = Groq(
    api_key="AGREGA API AQUÍ", 
)

def obtener_respuesta_grok(prompt):
    """
    Función para conectar con la API real de Groq.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Eres Kuali, un asistente financiero inteligente. Respondes de forma clara, amable y concisa."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            # 🔥 AQUÍ ESTÁ EL CAMBIO SOLUCIONANDO EL ERROR
            # Se ha reemplazado el viejo "llama3-8b-8192" por el nuevo soportado
            model="llama-3.1-8b-instant", 
            temperature=0.5,
        )
        
        # Retorna el contenido de la respuesta
        return chat_completion.choices[0].message.content

    except Exception as e:
        print(f"Error al conectar con Groq: {e}")
        return "Hubo un error al procesar tu solicitud con Groq."