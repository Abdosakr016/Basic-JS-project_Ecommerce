
/* let userData = document.querySelector(".name")

if(localStorage.getItem("username") ){

userGreeting.style.display = "flex"
userData.innerText = `Welcome ${currentUser}!`;

}

 */
let userData = document.querySelector("#usered")
let  links = document.querySelector("#links")

let loggedInUser = localStorage.getItem("loggedInUser");
let userGreeting = document.querySelector("#user_info");

if(localStorage.getItem("loggedInUser") ){
links.remove()
userGreeting.style.display = "flex"
userData.innerText = `Welcome ${loggedInUser}!`;

}



function signOut(){
    localStorage.removeItem("currentUser");
    window.location.reload();
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click", function(){
    signOut()
})