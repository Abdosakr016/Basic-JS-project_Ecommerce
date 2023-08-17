
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let loginBtn = document.querySelector("#sign_in");
let inputError = document.querySelector("#username-error");
let formError = document.querySelector("#form-error");
// regualar Expressions
let usernameRegExp = /^[A-Za-z][A-Za-z0-9_ ]{7,29}$/;
let emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validityChecker(){
  if(!usernameRegExp.test(username.value) && !emailRegExp.test(username.value)){
    inputError.innerText = "Enter a correct username or email adress";
    inputError.style.color = "red";
    return false;
    }
  else{
    inputError.innerText = "";
    return true;
  }
}
username.onblur = function(){
  validityChecker();
}


loginBtn.addEventListener("click", function(e) {
  e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => (u.username === username.value || u.email === username.value ) && u.password === password.value);

    if (user) {
      
      if(localStorage.getItem("guestCart")){
        user.cart.concat(JSON.parse(localStorage.getItem("guestCart")));
        localStorage.removeItem("guestCart");
      }else{
        user.cart = []
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
      formError.innerText = "";
      setTimeout(() => {
        window.location = "home.html";
      }, 1500);
    } else {
      formError.innerText = "wrong username or password";
      formError.style.color = "red";
    }
  }
);

