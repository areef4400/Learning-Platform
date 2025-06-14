

import sys
import json
import requests

def get_suggestions(prompt):
    api_key = "AIzaSyBAgYBPyDzxJjNAfPZXQibqGdP4KpgdaNg"  # 🔑 Replace with your actual YouTube Data API key
    search_url = "https://www.googleapis.com/youtube/v3/search"

    # Smart query to guide search towards education-focused content
    refined_query = f"what is {prompt} "

    params = {
        "part": "snippet",
        "q": refined_query,
        "key": api_key,
        "type": "video",
        "maxResults": 5,
        "videoDuration": "medium",  # filters out Shorts (medium = 4–20 mins)
        "order": "relevance"
    }

    response = requests.get(search_url, params=params)

    if response.status_code != 200:
        print(json.dumps({ "error": f"API request failed with status code {response.status_code}" }))
        sys.exit(1)

    data = response.json()
    video_links = []

    for item in data.get("items", []):
        video_id = item["id"]["videoId"]
        link = f"https://www.youtube.com/watch?v={video_id}"
        video_links.append(link)

    
    print(json.dumps(video_links, indent=4))


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No prompt provided" }))
        sys.exit(1)

    prompt = sys.argv[1]
    get_suggestions(prompt)
