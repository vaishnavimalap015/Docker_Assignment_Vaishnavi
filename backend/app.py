from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/submit", methods=["POST"])
def submit_form():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    course = data.get("course")

    print(f"Name: {name}")
    print(f"Email: {email}")
    print(f"Course: {course}")

    return jsonify({
        "message": "Form submitted successfully to Flask backend",
        "name": name,
        "email": email,
        "course": course
    })


@app.route("/", methods=["GET"])
def home():
    return "Flask backend is running"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)