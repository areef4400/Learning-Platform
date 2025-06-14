import sys
import json
import re
from groq import Groq

client = Groq(api_key="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")

def clean_json_string(raw_str):
    # Remove markdown code fences like ```json or ```
    raw_str = re.sub(r"```(?:json)?", "", raw_str).strip()

    # Extract JSON array if possible
    match = re.search(r"(\[.*\])", raw_str, re.DOTALL)
    cleaned = match.group(1) if match else raw_str

    # Replace single quotes with double quotes
    cleaned = cleaned.replace("'", '"')

    # Remove trailing commas
    cleaned = re.sub(r",\s*([\]}])", r"\1", cleaned)

    # Remove extra newlines and invisible characters
    cleaned = re.sub(r'\n+', '\n', cleaned)
    cleaned = cleaned.encode("utf-8", "ignore").decode("utf-8")  # Clean weird symbols

    return cleaned

def generate_roadmap(topic):
    try:
        prompt = f"""
        You are an expert teacher. Give a most important topics structured roadmap for learning the topic: "{topic}".
        Present the roadmap ONLY in JSON format like this:
        [
            {{
                "name": "Module 1",
                "children": [{{"name": "Subtopic 1"}}, {{"name": "Subtopic 2"}}]
            }},
            {{
                "name": "Module 2",
                "children": [{{"name": "Subtopic A"}}]
            }}
        ]
        Do not add explanations or any text outside the JSON.
        """

        chat_completion = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        roadmap_str = chat_completion.choices[0].message.content.strip()

        # Always clean and parse
        cleaned_str = clean_json_string(roadmap_str)
        roadmap_json = json.loads(cleaned_str)

        # Final output only (valid JSON)
        print(json.dumps({"roadmap": roadmap_json}, indent=2, ensure_ascii=False))

    except Exception as e:
        print(json.dumps({
            "error": "Failed to generate or parse roadmap",
            "details": str(e),
            "raw_response": roadmap_str if 'roadmap_str' in locals() else ""
        }, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No topic provided"}, ensure_ascii=False))
        sys.exit(1)

    topic = sys.argv[1]
    generate_roadmap(topic)
