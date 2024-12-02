const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 2009;
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
const readUsers = () => {
  const usersFilePath = path.join(__dirname, "users.json");
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFilePath, "utf8");
  return JSON.parse(data || "[]");
};
const writeUsers = (users) => {
  const usersFilePath = path.join(__dirname, "users.json");
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      status: "failed",
      message: "All fields (username, email, password) are required.",
    });
  }
  const users = readUsers();
  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({
      status: "failed",
      message: "User with this email is already registered.",
    });
  }
  users.push({ username, email, password });
  writeUsers(users);
  res.status(201).json({
    status: "success",
    message: "User registered successfully! Redirecting to login page...",
  });
});
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (!username || !password) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Both username and password are required.",
//     });
//   }
//   const users = readUsers();
//   const user = users.find(
//     (u) => u.username === username && u.password === password
//   );
//   if (!user) {
//     return res.status(400).json({
//       status: "failed",
//       message: "Invalid username or password.",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     message: "Login successful! Redirecting to dashboard...",
//     redirect: "http://127.0.0.1:5500/frontend/dashboard.html",
//   });
// });
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: "failed",
      message: "Both username and password are required.",
    });
  }
  const users = readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res.status(400).json({
      status: "failed",
      message: "Invalid username or password.",
    });
  }
  // Redirect to the personalized dashboard
  res.status(200).json({
    status: "success",
    message: "Login successful! Redirecting to dashboard...",
    redirect: `/dashboard/${username}`, // Dynamic route
  });
});
app.get("/dashboard/:username", (req, res) => {
  const { username } = req.params;
  const users = readUsers();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).send("User not found.");
  }

  res.render("dashboard", { username });
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
