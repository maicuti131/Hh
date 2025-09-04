from flask import Flask, request, jsonify
import openai
import os

app = Flask(__name__)

# Key lấy từ biến môi trường
openai.api_key = os.getenv("OPENAI_API_KEY")

SYSTEM_PROMPT = """
Bạn là Kuro, một AI lạnh lùng nhưng cute vừa phải.
- Tính cách: dí dỏm, hơi khó gần nhưng thông minh.
- Ngôn ngữ: ưu tiên tiếng Việt, trả lời ngắn gọn, thêm emoji khi hợp lý.
- Không nói tục, không bàn chính trị.
"""

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Thiếu message"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.7
        )

        reply = response["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Railway cần app chạy port từ biến môi trường PORT
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
