from fastapi import APIRouter
from app.services.github import fetch_github_stats

router = APIRouter()

@router.get("/stats")
async def get_stats():
    stats = await fetch_github_stats()
    return stats
