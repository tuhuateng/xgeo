from abc import ABC, abstractmethod
from typing import Dict, Any

class BaseAIAdapter(ABC):
    def __init__(self, api_key: str):
        self.api_key = api_key

    @abstractmethod
    async def analyze(self, brand_name: str) -> Dict[str, Any]:
        """
        Analyze the brand and return a standardized result dict.
        Result should include:
        - raw_response: str
        - score: float (0-100)
        - sentiment: str
        """
        pass
