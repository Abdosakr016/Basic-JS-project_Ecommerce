// check if the user is already signed in
if(localStorage.getItem("currentUser")){
  window.onload = function(){
    window.location.assign("./Home.html");
  }
}

// getting data from local storage
let usersString = localStorage.getItem("users")||"";


// declaring varaibles
let username = document.querySelector("#username");
let email= document.querySelector("#email");
let password = document.querySelector("#password");
let passwordError = document.getElementById("password-error");
let repeatPasswordInput = document.getElementById("repeat-password");
let registerBtn = document.querySelector("#sign_up");
let nameError = document.getElementById("fullname-error");
let emailError = document.querySelector("#email-error");
// regualar Expressions
let usernameRegExp = /^[A-Za-z][A-Za-z0-9_ ]{7,29}$/;
let passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


//  check if the input already exists
function isNewUser(){
  if(usersString.includes(username.value) || usersString.includes(email.value)){
    alert("Username or email has already been signed up with");
    return false;
  }else{
    return true;
  }
}
 
 
 // Validate the Full Name input field
 function validateName() {
    if(usernameRegExp.test(username.value)){
      nameError.innerText ="";
      username.style.outline = "unset";
      return true;
    }
    else{
      nameError.innerText = "Enter a valid username";
      nameError.style.color = "red";
      username.style.outline = "solid 1px red";
      return false;
    }
  }
  
  // Validate the Password and Repeat Password input fields
  // 
  function validatePassword() {
    if(passwordRegExp.test(password.value)){
      passwordError.innerText ="";
      password.style.outline = "unset";
      return true;
    }
    else{
      passwordError.innerText = "Enter a stronger password";
      passwordError.style.color="red";
      password.style.outline = "1px solid red";
      return false;
    }
  }
  //  validate the repeate password field
  function validateRepeatPassword(){
    if(validatePassword()){
      if(repeatPasswordInput.value === password.value){
        passwordError.innerText ="";
        repeatPasswordInput.style.outline = "unset";
        return true;
      }
      else{
        passwordError.innerText = "The two password inputs should be the same";
        passwordError.style.color="red";
        repeatPasswordInput.style.outline = "1px solid red";
        return false;
      }
    }
  } 

  password.onblur = function(){
    validatePassword();
  };
  repeatPasswordInput.onblur = function(){
    validateRepeatPassword();
  };

  // validate email
  function validateEmail(){
    if(emailRegExp.test(email.value)){
      emailError.innerText ="";
      email.style.outline = "unset";
      return true;
    }
    else{
      emailError.innerText = "Enter a valid email adress";
      emailError.style.color="red";
      email.style.outline = "1px solid red";
      return false;
    }
  }
  email.onblur = function(){
    validateEmail();
  }


  
  // submission:-
  function submitForm(e){
    e.preventDefault();
    if(!validateName() || !validateEmail() || !validateRepeatPassword() || !isNewUser()){
      alert("please Enter Vaild Data");
    }else{
      let user = {
          username: username.value,
          email: email.value,
          password: password.value,
          cart:[]
      }
      let users = JSON.parse(localStorage.getItem("users")) || []
      users.push(user)
      localStorage.setItem("users", JSON.stringify(users, null, "\n"))
      
      setTimeout(() => {
          window.location = "login.html"
      }, 1500) 
    }
  }
