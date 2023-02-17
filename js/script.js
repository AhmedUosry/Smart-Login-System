// variables //
var signInEmail = document.getElementById("signInUserMail");
var signInPassword = document.getElementById("signinUserPass");
var userName = document.getElementById("userName");
var userMail = document.getElementById("userMail");
var userPass = document.getElementById("userPass");
var mainTitle = document.querySelector(".title");
var logInButton = document.getElementById("login");
var signUp = document.getElementById("signUp");
var signUpButton = document.getElementById("signUpButton");
var signInButton = document.getElementById("signInButton");
var logOutButton = document.getElementById("logOutButton");
var alertMessage = document.getElementById("alertMessage");
var successMessage = document.getElementById("success");
var question = document.querySelector(".question");
var home = document.getElementById("home");
var form = document.getElementById("form");
var password = signInPassword.value;
var email = signInEmail.value;
var tmp = 0;
// ****************** //

// localstorage //
if (localStorage.getItem("userData") === null) {
  var storageData = [];
} else {
  storageData = [];
  storageData = JSON.parse(localStorage.getItem("userData"));
}
// ****************** //

// Events //
signUpButton.addEventListener("click", function () {
  showAndHideSignUp();
  clrSignUp();
});

signInButton.addEventListener("click", function () {
  ShowAndHideSignIn();
  clrSignUp();
  clrSignIn();
});

logInButton.addEventListener("click", function () {
  if (validationSignIn() == true) {
    alertMessage.classList.remove("d-none");
  } else if (userDataMatch() != true) {
    alertMessage.classList.remove("d-none");
    alertMessage.innerText = "Incorrect Email or Password";
  } else if (userDataMatch() == true) {
    mainTitle.innerText = `Welcome ${storageData[tmp].name}`;
    home.classList.remove("d-none");
    form.classList.replace("d-block", "d-none");
    session();
  }
});

logOutButton.addEventListener("click", function () {
  home.classList.add("d-none");
  form.classList.replace("d-none", "d-block");
  alertMessage.classList.add("d-none");
  localStorage.removeItem("userSession");
  clrSignIn();
});

signUp.addEventListener("click", function () {
  var userData = {
    name: userName.value,
    mail: userMail.value,
    pass: userPass.value,
  };
  if (validationSignUp() === true) {
    alertMessage.classList.remove("d-none");
    successMessage.classList.add("d-none");
  } else if (validateName() === false) {
    alertMessage.classList.remove("d-none");
    successMessage.classList.add("d-none");
    alertMessage.innerText = "Enter A Valid Name";
  } else if (validateEmail() === false) {
    alertMessage.classList.remove("d-none");
    successMessage.classList.add("d-none");
    alertMessage.innerText = "Enter A Valid Email";
  } else if (UserDataExist() === true) {
    alertMessage.classList.remove("d-none");
    successMessage.classList.add("d-none");
    alertMessage.innerText = "Email Already Exist";
  } else {
    storageData.push(userData);
    localStorage.setItem("userData", JSON.stringify(storageData));
    successMessage.classList.remove("d-none");
    alertMessage.classList.add("d-none");
    clrSignUp();
  }
});
// ****************** //


// functions //

function session() {
  if (
    storageData[tmp].mail == signInEmail.value &&
    storageData[tmp].pass == signInPassword.value
  ) {
    localStorage.getItem("userSession");
    localStorage.setItem("userSession", JSON.stringify(storageData[tmp].name));
  }
}

function validationSignUp() {
  if (userMail.value == "" || userPass.value == "" || userName.value == "") {
    alertMessage.innerText='All Inputs Required'
    return true;
  } 
}

function validationSignIn() {
  if (signInEmail.value == "" || signInPassword.value == "") {
    alertMessage.innerText='All Inputs Required'
    return true;
  } 
}

function clrSignIn() {
  signInEmail.value = "";
  signInPassword.value = "";
}

function clrSignUp() {
  userName.value = "";
  userMail.value = "";
  userPass.value = "";
}

function UserDataExist() {
  for (var i = 0; i < storageData.length; i++) {
    if (storageData[i].mail == userMail.value) {
      tmp = i;
      return true;
    }
  }
}

function userDataMatch() {
  for (var i = 0; i < storageData.length; i++) {
    if (
      storageData[i].mail == signInEmail.value &&
      storageData[i].pass == signInPassword.value
    ) {
      tmp = i;
      return true;
    }
  }
}

function validateEmail() {
  var regex = /^[A-Za-z0-9]{3,15}@(gmail|yahoo|hotmail|outlook)\.com$/;
  return regex.test(userMail.value);
}

function validateName() {
  var regex2 = /^[A-Za-z0-9]{3,12}$/;
  return regex2.test(userName.value);
}

function ShowAndHideSignIn() {
  signInEmail.classList.replace("d-none", "d-block");
  signInPassword.classList.replace("d-none", "d-block");
  userMail.classList.replace("d-block", "d-none");
  userPass.classList.replace("d-block", "d-none");
  successMessage.classList.add("d-none");
  alertMessage.classList.add("d-none");
  userName.classList.add("d-none");
  signUp.classList.add("d-none");
  logInButton.classList.replace("d-none", "d-block");
  signInButton.classList.add("d-none");
  signUpButton.classList.replace("d-none", "d-inline");
  question.innerText = "Don’t have an account?";
}

function showAndHideSignUp() {
  signInEmail.classList.replace("d-block", "d-none");
  signInPassword.classList.replace("d-block", "d-none");
  userMail.classList.replace("d-none", "d-block");
  userPass.classList.replace("d-none", "d-block");
  successMessage.classList.add("d-none");
  alertMessage.classList.add("d-none");
  userName.classList.remove("d-none");
  signUp.classList.remove("d-none");
  logInButton.classList.replace("d-block", "d-none");
  signInButton.classList.remove("d-none");
  signUpButton.classList.replace("d-inline", "d-none");
  question.innerText = "You have an account?";
}

// ****************** //