              
import os
import sys
import json
from groq import Groq

# Initialize Groq client
client = Groq(api_key="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")  # Replace with your actual API key

def get_education_websites(prompt):
    try:
        full_prompt = (
            f"Provide the top 3 direct educational latest website links related to the topic: {prompt}.Prioritize links based on relevance to the giben topic. Only include working, relevant URLs — one per line.No explanations, no text, no markdown formatting. Just plain links."
        )
        # Wikipedia ,GeeksforGeeks, TutorialsPoint, Shiksha, Byju's.
        chat_completion = client.chat.completions.create(
            model="llama3-70b-8192",  # or use "llama-3-8b-8192" if needed
            messages=[
                {"role": "user", "content": full_prompt}
            ]
        )

        response_content = chat_completion.choices[0].message.content.strip()
        websites = response_content.splitlines()
        
        # Clean and filter links
        websites = [link.strip() for link in websites if link.startswith("http")]
        
        print(json.dumps({"result": websites}))

    except Exception as e:
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No prompt provided"}))
        sys.exit(1)

    user_prompt = sys.argv[1]
    get_education_websites(user_prompt)




