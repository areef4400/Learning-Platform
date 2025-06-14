import sys
import json
import re
from groq import Groq

client = Groq(api_key="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")

def clean_json_string(raw_str):
    # Remove triple backticks and markdown hints
    raw_str = re.sub(r"```(?:json)?", "", raw_str).replace("```", "").strip()

    # Extract the longest JSON array from the string
    match = re.search(r"\[.*\]", raw_str, re.DOTALL)
    cleaned = match.group(0) if match else raw_str

    # Normalize smart quotes to normal quotes
    cleaned = cleaned.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")

    # Remove trailing commas before ] or }
    cleaned = re.sub(r",\s*([\]}])", r"\1", cleaned)

    return cleaned

def generate_quiz(topic):
    try:
        prompt = f"""
        You are an expert quiz creator. Create a quiz with 5 multiple-choice questions on the topic: "{topic}".
        Each question should have:
        - The question text
        - Four options labeled A, B, C, D
        - The correct answer (one of A, B, C, or D)

        Respond ONLY with VALID JSON like this (no explanations, no markdown, no extra text):

        [
          {{
            "question": "What is the function of the CPU?",
            "options": {{
              "A": "Store data",
              "B": "Process data",
              "C": "Transfer files",
              "D": "Control monitor"
            }},
            "answer": "B"
          }}
        ]
        """

        response = client.chat.completions.create(
            model="llama3-70b-8192",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        raw_output = response.choices[0].message.content.strip()
        cleaned = clean_json_string(raw_output)

        # Optional: print cleaned JSON for debugging
        # print("Cleaned JSON:")
        # print(cleaned)

        quiz = json.loads(cleaned)

        print(json.dumps({"quiz": quiz}, indent=2, ensure_ascii=False))

    except Exception as e:
        print(json.dumps({
            "error": "Failed to generate or parse quiz",
            "details": str(e),
            "raw_response": raw_output if 'raw_output' in locals() else ""
        }, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No topic provided"}, ensure_ascii=False))
        sys.exit(1)

    topic = sys.argv[1]
    generate_quiz(topic)
