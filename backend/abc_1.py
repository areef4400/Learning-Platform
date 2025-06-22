import os
import json
import sys
from groq import Groq

# ✅ Your Groq API key (for testing only; secure this in production)
api_key = "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"

# ✅ Initialize the Groq client
client = Groq(api_key=api_key)

def get_suggestions(prompt):
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama3-70b-8192",
        )
        response_content = chat_completion.choices[0].message.content.strip()
        return { "response": response_content }

    except Exception as e:
        return { "error": str(e) }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No prompt provided" }))
        sys.exit(1)

    prompt = sys.argv[1]
    query = f"give me brief explanation about {prompt} with all heading and at least two paragraphs content, examples for each heading"
    
    result = get_suggestions(query)
    print(json.dumps(result))  # ✅ Always output JSON
