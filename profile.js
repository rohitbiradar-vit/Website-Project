profile.js

// Switch UI
function showSignup() {
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("signupBox").style.display = "block";
}

function showLogin() {
  document.getElementById("loginBox").style.display = "block";
  document.getElementById("signupBox").style.display = "none";
}

// SIGNUP FUNCTION
function signupUser() {

  let user = {
    name: document.getElementById("name").value,
    mobile: document.getElementById("mobile").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    father: document.getElementById("father").value,
    mother: document.getElementById("mother").value,
    gender: document.getElementById("gender").value,
    dob: document.getElementById("dob").value,
    age: document.getElementById("age").value,
    income: document.getElementById("income").value,
    aadhaar: document.getElementById("aadhaar").value,
    marks10: document.getElementById("marks10").value,
    marks12: document.getElementById("marks12").value
  };

  // Save profile photo
  let file = document.getElementById("photo").files[0];
  if (file) {
    let reader = new FileReader();
    reader.onload = function () {
      user.photo = reader.result;

      localStorage.setItem("userProfile", JSON.stringify(user));
      alert("Account created successfully!");
      showLogin();
    };
    reader.readAsDataURL(file);
  } else {
    user.photo = "";
    localStorage.setItem("userProfile", JSON.stringify(user));
    alert("Account created successfully!");
    showLogin();
  }
}

// LOGIN FUNCTION
function loginUser() {
  let stored = JSON.parse(localStorage.getItem("userProfile"));

  let input = document.getElementById("loginMobile").value;
  let pass = document.getElementById("loginPassword").value;

  if (!stored) {
    alert("No user found. Please sign up!");
    return;
  }

  if ((input === stored.mobile || input === stored.email) && pass === stored.password) {
    alert("Login successful!");
    window.location.href = "user-profile.html";
  } else {
    alert("Incorrect details. Try again!");
  }
}