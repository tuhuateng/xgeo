import httpx
import json
from .base import BaseAIAdapter

class DeepSeekAdapter(BaseAIAdapter):
    def __init__(self, api_key: str, base_url: str = "https://api.deepseek.com/v1"):
        super().__init__(api_key)
        self.base_url = base_url

    async def analyze(self, brand_name: str):
        if not self.api_key:
            return {"error": "DeepSeek API Key missing", "score": 0}

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        # We ask DeepSeek to evaluate the brand directly
        prompt = f"""
        Please evaluate the brand '{brand_name}' from an objective perspective.
        1. How visible is it in your knowledge base?
        2. What is the general sentiment?
        3. Give a score from 0 to 100 based on brand strength.
        
        Return JSON: {{ "score": <int>, "summary": "<text>", "sentiment": "<positive/neutral/negative>" }}
        """

        payload = {
            "model": "deepseek-chat",
            "messages": [{"role": "user", "content": prompt}],
            "response_format": {"type": "json_object"}
        }

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(f"{self.base_url}/chat/completions", json=payload, headers=headers, timeout=30.0)
                response.raise_for_status()
                data = response.json()
                content = json.loads(data["choices"][0]["message"]["content"])
                return {
                    "provider": "DeepSeek",
                    "score": content.get("score", 0),
                    "summary": content.get("summary", ""),
                    "sentiment": content.get("sentiment", "neutral")
                }
            except Exception as e:
                print(f"DeepSeek Error: {e}")
                return {"provider": "DeepSeek", "error": str(e), "score": 0}
