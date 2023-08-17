// create a card
function addItem(item){
    let card = document.createElement("div");
    card.className = "card";
    card.id = "card"+item["id"];
    let cardImage = document.createElement("img");
    cardImage.src = item["image"];
    let cardTitle = document.createElement("h4");
    cardTitle.innerHTML = item["title"];
    let cardRatingRate = document.createElement("span");
    cardRatingRate.innerHTML = item["rating"]["rate"];
    cardRatingRate.className = "ratingRate";
    let cardRatingCount = document.createElement("span");
    cardRatingCount.innerHTML = item["rating"]["count"];
    cardRatingCount.className = "ratingCount";
    let cardPrice = document.createElement("span");
    cardPrice.innerHTML =item["price"] + "$"; 
    cardPrice.className = "price";
    let RemoveFromCart = document.createElement("button")
    RemoveFromCart.innerText = "remove from cart";


    card.append(cardImage, cardTitle, cardRatingRate, cardRatingCount, cardPrice, RemoveFromCart);
    let container = document.querySelector(".containerCard");
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
        
    let container  = document.querySelector(".container");
        if(container.innerHTML ===""){
            container.innerHTML = "<h1>Your cart is empty go back to home and continue shopping</h1><h1><a href='../Home.html'>home</a></h1>"
        
    }
    calculatePrice();
    let removeBtn = document.querySelectorAll("button");
    removeBtn.forEach(element=>{
        element.addEventListener("click", function(e){
            e.target.parentNode.remove();
            calculatePrice();
        })
    })
    
}
}

function calculatePrice(){
    let priceElementArray = document.querySelectorAll(".price");
    let totalPrice = 0;
    priceElementArray.forEach(function(e){totalPrice += Number.parseFloat(e.innerHTML) })
    let h1 = document.querySelector(".totalPrice h1");
    h1.innerText = totalPrice + "$";
    console.log(totalPrice)

}
