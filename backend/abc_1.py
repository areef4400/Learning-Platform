import os
from groq import Groq
import json  
import sys
import os

# Initialize the Gorg client


client = Groq(api_key="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")
def get_suggestions(prompt):
    try:
        # Send the request to the Gorg API
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile",
        )
        # Extract the AI response
        response_content = chat_completion.choices[0].message.content.strip()
        print(json.dumps({ "response": response_content }))
    
    except Exception as e:
        # Handle and print errors
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({ "error": "No prompt provided" }))
        sys.exit(1)

    prompt = sys.argv[1]
    get_suggestions("give me brief explanation about "+prompt+"with all heading and atlest two paragrams content,examples for each heading")



