// create a card
function addItem(item){
    let card = document.createElement("div");
    card.className = "card";
    let cardImage = document.createElement("img");
    cardImage.src = item["image"];
    let cardTitle = document.createElement("h4");
    cardTitle.innerHTML = item["title"];
    let cardDescibtion = document.createElement("p");
    cardDescibtion.innerHTML = item["description"];
    let cardRatingRate = document.createElement("span");
    cardRatingRate.innerHTML = item["rating"]["rate"];
    cardRatingRate.className = "ratingRate";
    let cardRatingCount = document.createElement("span");
    cardRatingCount.innerHTML = item["rating"]["count"];
    cardRatingCount.className = "ratingCount";
    let cardPrice = document.createElement("span");
    cardPrice.innerHTML =item["price"]; 
    cardPrice.className = "price"

    card.append(cardImage, cardTitle, cardDescibtion, cardRatingRate, cardRatingCount, cardPrice);
    let container = document.querySelector(".container");
    container.appendChild(card);
}
// get user data from storage
let currentuser = JSON.parse(localStorage.getItem("currentUser"));

let cartItems;
window.addEventListener('load',function(e){
    if(currentuser === null){
        this.window.location.replace("../register.html");
        console.log("hello from window")
    }
    else{
        cartItems = currentuser.cart;
        // cartItems = [19,16,2];
    }
})
let api = new XMLHttpRequest();
api.open("GET", "https://fakestoreapi.com/products/")
api.send("");
api.onreadystatechange = function(){
    if(api.readyState === 4 && api.status === 200){
        let apiArr = JSON.parse(api.responseText);

        for(let i = 0; i<cartItems.length; i++){
            addItem(apiArr[cartItems[i]-1]);
        }
        console.log(JSON.parse(api.responseText).length);
        
    }
    
}



