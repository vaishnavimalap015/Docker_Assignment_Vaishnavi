const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Student Registration Form</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                }

                form {
                    width: 400px;
                }

                label {
                    display: block;
                    margin-top: 15px;
                }

                input, select {
                    width: 100%;
                    padding: 8px;
                    margin-top: 5px;
                }

                button {
                    margin-top: 20px;
                    padding: 10px 20px;
                }
            </style>
        </head>

        <body>
            <h1>Student Registration Form</h1>

            <form action="/submit" method="POST">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="course">Course:</label>
                <select id="course" name="course" required>
                    <option value="">Select Course</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Python">Python</option>
                    <option value="AWS">AWS</option>
                </select>

                <button type="submit">Submit</button>

            </form>
        </body>
        </html>
    `);
});

app.post("/submit", async (req, res) => {
    try {
        const response = await axios.post(
            "http://backend:5000/submit",
            {
                name: req.body.name,
                email: req.body.email,
                course: req.body.course
            }
        );

        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Submission Successful</title>
            </head>
            <body>
                <h1>Form Submitted Successfully</h1>
                <p><strong>Response from Flask Backend:</strong></p>
                <p>${response.data.message}</p>
                <p>Name: ${response.data.name}</p>
                <p>Email: ${response.data.email}</p>
                <p>Course: ${response.data.course}</p>
                <br>
                <a href="/">Go Back</a>
            </body>
            </html>
        `);

    } catch (error) {
        console.error("Error connecting to Flask:", error.message);

        res.status(500).send(`
            <h1>Backend Connection Error</h1>
            <p>Could not connect to the Flask backend.</p>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Frontend running at http://localhost:${PORT}`);
});