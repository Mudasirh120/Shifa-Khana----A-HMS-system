
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const switchToSignup = document.querySelector("#switch-to-signup");
const switchToLogin = document.querySelector("#switch-to-login");
const backToHome = document.querySelector(".home");
backToHome.addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "index.html";
});
switchToSignup.addEventListener("click", () => {
  loginForm.classList.add("hidden");
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
  signupForm.classList.remove("hidden");
});
switchToLogin.addEventListener("click", () => {
  signupForm.classList.add("hidden");
  signupForm.classList.remove("active");
  loginForm.classList.remove("hidden");
  loginForm.classList.add("active");
});
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  try {
    const response = await fetch("http://localhost:2009/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
      switchToLogin.click();
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
// loginForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const username = document.getElementById("login-username").value;
//   const password = document.getElementById("login-password").value;
//   try {
//     const response = await fetch("http://localhost:2009/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });
//     const data = await response.json();
//     alert(data.message);
//     if (response.ok) {
//       window.location.href = data.redirect;
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  try {
    const response = await fetch("http://localhost:2009/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    alert(data.message);
    if (response.ok) {
      window.location.href = data.redirect; // Redirect to dashboard
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
