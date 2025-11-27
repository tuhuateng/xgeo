import asyncio
import os
from .models.deepseek import DeepSeekAdapter
from .models.doubao import DoubaoAdapter

async def analyze_brand_across_models(brand_name: str):
    # Initialize adapters
    adapters = [
        DeepSeekAdapter(api_key=os.environ.get("DEEPSEEK_API_KEY")),
        DoubaoAdapter(api_key=os.environ.get("DOUBAO_API_KEY"))
        # Add Kimi, Zhipu here later
    ]

    # Run all analyses in parallel
    tasks = [adapter.analyze(brand_name) for adapter in adapters]
    results = await asyncio.gather(*tasks)

    # Aggregate results
    total_score = 0
    valid_count = 0
    model_details = []

    for res in results:
        if "error" not in res and res.get("score", 0) > 0:
            total_score += res["score"]
            valid_count += 1
        model_details.append(res)

    avg_score = round(total_score / valid_count, 1) if valid_count > 0 else 0

    return {
        "total_score": avg_score,
        "dimensions": {
            "visibility": avg_score + 2, # Mock logic for dimensions based on avg
            "comprehension": avg_score - 2,
            "representation": avg_score + 1,
            "optimization": avg_score - 1
        },
        "model_breakdown": model_details,
        "summary": f"Analyzed across {len(adapters)} engines. Average score: {avg_score}"
    }
