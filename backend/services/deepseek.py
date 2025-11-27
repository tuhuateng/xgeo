import httpx
import os
import json

DEEPSEEK_API_KEY = os.environ.get("DEEPSEEK_API_KEY")
DEEPSEEK_BASE_URL = os.environ.get("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")

async def analyze_brand(brand_name: str):
    """
    Analyzes a brand using DeepSeek API.
    This mocks a 'search' by asking the LLM to retrieve its knowledge.
    If DeepSeek has a specific 'online' or 'search' tool enabled via API, 
    we would pass that tool definition here.
    """
    if not DEEPSEEK_API_KEY:
        # Fallback for demo if no key
        return {
            "summary": "DeepSeek API Key not configured. Returning demo analysis.",
            "score": 85,
            "details": "Please configure DEEPSEEK_API_KEY in .env"
        }

    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json"
    }

    # Prompt designed to output JSON structure matching our dashboard needs
    prompt = f"""
    Analyze the brand '{brand_name}' in the context of Generative Engine Optimization (GEO).
    Provide a JSON response with the following structure:
    {{
        "total_score": <0-100>,
        "dimensions": {{
            "visibility": <0-100>,
            "comprehension": <0-100>,
            "representation": <0-100>,
            "optimization": <0-100>
        }},
        "summary": "<short summary>",
        "recommendations": [
            {{ "title": "<title>", "type": "content|schema|authority", "priority": "high|medium|low", "suggestion": "<text>" }}
        ]
    }}
    """

    payload = {
        "model": "deepseek-chat",
        "messages": [
            {"role": "system", "content": "You are an expert in GEO (Generative Engine Optimization)."},
            {"role": "user", "content": prompt}
        ],
        "response_format": {"type": "json_object"}
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(f"{DEEPSEEK_BASE_URL}/chat/completions", json=payload, headers=headers, timeout=30.0)
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            return json.loads(content)
        except Exception as e:
            print(f"DeepSeek API Error: {e}")
            return None
