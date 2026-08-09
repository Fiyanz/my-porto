import httpx
import asyncio
from datetime import datetime, timezone
from typing import Dict, Any, Optional
import os

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", None)
GITHUB_USERNAME = "Fiyanz" # Based on the repo name

cache = {
    "stats": None,
    "last_updated": 0
}

CACHE_TTL = 3600 # 1 hour

async def fetch_github_stats() -> Dict[str, Any]:
    current_time = datetime.now(timezone.utc).timestamp()
    if cache["stats"] and (current_time - cache["last_updated"]) < CACHE_TTL:
        return cache["stats"]
        
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"

    async with httpx.AsyncClient() as client:
        # Fetch user data
        user_resp = await client.get(f"https://api.github.com/users/{GITHUB_USERNAME}", headers=headers)
        if user_resp.status_code != 200:
            return get_fallback_stats()
            
        user_data = user_resp.json()
        
        # Fetch repos to count stars and PRs (simplified)
        repos_resp = await client.get(f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100", headers=headers)
        repos_data = repos_resp.json() if repos_resp.status_code == 200 else []
        
        total_stars = sum(repo.get("stargazers_count", 0) for repo in repos_data)
        
        # We can simulate streak and PRs for now or try to fetch events
        stats = {
            "public_repos": user_data.get("public_repos", 0),
            "followers": user_data.get("followers", 0),
            "total_stars": total_stars,
            "total_commits": 1204, # Mock for now, requires GraphQL
            "activity_score": 4.8, # Mock for now
            "streak_days": 127, # Needs GraphQL or scraping to be real, mock for now
            "prs_merged": 48 # Needs search API, mock for now
        }
        
        cache["stats"] = stats
        cache["last_updated"] = current_time
        return stats

def get_fallback_stats():
    return {
        "public_repos": 36,
        "followers": 0,
        "total_stars": 84,
        "total_commits": 1204,
        "activity_score": 4.8,
        "streak_days": 127,
        "prs_merged": 48
    }

async def fetch_repo_details(github_url: str) -> Optional[Dict[str, Any]]:
    # Extract owner and repo from url (e.g., https://github.com/Fiyanz/repo-name)
    parts = github_url.rstrip("/").split("/")
    if len(parts) < 2:
        return None
        
    owner = parts[-2]
    repo = parts[-1]
    
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
        
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"https://api.github.com/repos/{owner}/{repo}", headers=headers)
        if resp.status_code != 200:
            return None
            
        data = resp.json()
        return {
            "title": data.get("name", repo),
            "description": data.get("description", ""),
            "stars": data.get("stargazers_count", 0),
            "forks": data.get("forks_count", 0),
            "language": data.get("language", ""),
            "updated_at": data.get("updated_at", "")
        }
