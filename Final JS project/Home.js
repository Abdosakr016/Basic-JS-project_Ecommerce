// @ts-nocheck
let currentUser, cart;
if (localStorage.getItem("currentUser")) {
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  cart = currentUser["cart"];
} else {
  cart = [];
}

let signUpBtn = document.querySelector("#navbar > a");
if(localStorage.currentUser){
  signUpBtn.style.display = "none";
  let out = document.createElement("a");
  out.setAttribute("onclick","signOut();");
  out.innerHTML = "logOut";
  out.style= "cursor:pointer;"
  document.querySelector("#navbar").append(out);
}

// function that modify the local storage of cart

function cartStore() {
  if (localStorage.getItem("currentUser")) {
    // localStorage.setItem(JSON.stringify(cart));
    currentUser["cart"] = cart;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  } else {
    localStorage.setItem("guestCart", JSON.stringify(cart));
  }
}

// A function to update the cart badge with the number of items
function updateCartBadge() {
  var badge = document.querySelector(".count"); // Select the badge element
  badge.textContent = cart.length; // Set its text content to the cart length
}

let apiData;
// function that gets data from xhr based on id array
function getDataFromApi() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "https://fakestoreapi.com/products");
  xhr.send("");
  xhr.onreadystatechange = function (e) {
    if (xhr.status === 200 && xhr.readyState === 4) {
      let items = JSON.parse(xhr.responseText);
      apiData = items;
      let category = document.getElementById("categorySelect").value;
      apiData = apiData.filter(function (product) {
        if (product["category"] === category || category === "all") {
          return true;
        } else {
          return false;
        }
      });
      let container = document.getElementById("container");
      container.innerHTML = "";
      displayItems(apiData);
    }
  };
}

// A function to add an item to the cart
function addToCart(item) {
  if (cart.includes(item["id"])) {
    alert("item has been alredy added to the cart");
  } else {
    cart.push(item["id"]); // Push the item to the cart array
    updateCartBadge(); // Update the badge
    alert("Item added to cart"); // Show a confirmation message
    let card = document.querySelector("#card" + item["id"]);
    card.querySelector(".removeButton").classList.add("showBtn");
    cartStore();
  }
}

// A function to remove an item from the cart
function removeFromCart(item) {
  var index = cart.indexOf(item["id"]); // Find the index of the item in the cart array
  if (index > -1) {
    // If the item exists in the cart
    cart.splice(index, 1); // Remove it from the array
    updateCartBadge(); // Update the badge
    alert("Item removed from cart"); // Show a confirmation message
    let card = document.querySelector("#card" + item["id"]);
    card.querySelector(".removeButton").classList.remove("showBtn");
    cartStore();
  } else {
    // If the item does not exist in the cart
    alert("Item not in cart"); // Show an error message
  }
}

// A function to get some sample items from an API using AJAX
function getItems() {
  var xhr = new XMLHttpRequest(); // Create a new XMLHttpRequest object
  xhr.open("GET", "https://fakestoreapi.com/products"); // Open a GET request to the API URL
  xhr.onload = function () {
    // Define a callback function for when the request is completed
    if (xhr.status === 200) {
      // If the status code is 200 (OK)
      var items = JSON.parse(xhr.responseText); // Parse the response text as JSON and store it in a variable
      displayItems(items); // Call another function to display the items on the page

      for (i in cart) {
        let showBtn = document.querySelector(
          "#card" + cart[i] + " .removeButton"
        );
        showBtn.classList.add("showBtn");
      }
      updateCartBadge();
    } else {
      // If the status code is not 200 (OK)
      alert("Error: " + xhr.statusText); // Show an error message with the status text
    }
  };
  xhr.send(); // Send the request
}

// function that takes item as a parameter then return a card
function cardMaker(item) {
  var card = document.createElement("div"); // Create a new div element for the card
  card.className = "pro";
  card.id = "card" + item["id"];

  var image = document.createElement("img"); // Create a new img element for the image
  image.src = item.image; // Set its src attribute to the item image URL

  var category = document.createElement("span"); // Create a new img element for the image
  category.textContent = item.category; // Set its src attribute to the item image URL

  var title = document.createElement("h3"); // Create a new h3 element for the title
  title.textContent = item.title; // Set its text content to the item title

  var price = document.createElement("p"); // Create a new p element for the price
  price.textContent = "$" + item.price; // Set its text content to the item price with a dollar sign

  var addButton = document.createElement("button"); // Create a new button element for the add button
  addButton.textContent = "Add to cart"; // Set its text content to "Add to cart"
  addButton.className = "addButton";
  addButton.onclick = function () {
    // Define an onclick function for when the button is clicked
    addToCart(item); // Call the addToCart function with the item object as an argument
  };

  var removeButton = document.createElement("button"); // Create a new button element for the remove button
  removeButton.textContent = "Remove from cart"; // Set its text content to "Remove from cart"
  removeButton.className = "removeButton";
  removeButton.onclick = function () {
    // Define an onclick function for when the button is clicked
    removeFromCart(item); // Call the removeFromCart function with the item object as an argument
  };

  card.appendChild(image); // Append the image element to the card element
  card.appendChild(category); // Append the title element to the card element
  card.appendChild(title); // Append the title element to the card element
  card.appendChild(price); // Append the price element to the card element
  card.appendChild(addButton); // Append the add button element to the card element
  card.appendChild(removeButton); // Append the remove button element to the card element
  return card;
}

// function that returns a card
let container = document.querySelector("#container"); // Create a new div element for the container

function displayItems(items) {
  for (var i = 0; i < items.length; i++) {
    // Loop through the items array
    var item = items[i]; // Get the current item object
    let card = cardMaker(item);
    container.appendChild(card); // Append the card element to the container element
  }
}

function searchItems() {
  document.querySelector("#hero").style = "display:none";
  var searchInput = document.getElementById("search");
  var searchTerm = searchInput.value.toLowerCase(); // Get the value of the search input and convert it to lowercase
  var cards = document.querySelectorAll("#container > div"); // Select all the card elements

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var title = card.querySelector("h3").textContent.toLowerCase(); // Get the title of the current card and convert it to lowercase

    if (title.includes(searchTerm)) {
      card.style.display = "block"; // If the search term is found in the title, display the card
    } else {
      card.style.display = "none"; // If the search term is not found in the title, hide the card
    }
  }
}

function filterItems() {
  var minPrice = document.getElementById("min-price").value;
  var maxPrice = document.getElementById("max-price").value;
  var cards = document.querySelectorAll("#container > div"); // Select all the card elements

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var price = parseFloat(
      card.querySelector("p").textContent.replace("$", "")
    ); // Get the price of the current card as a float

    var PriceInRange =
      (isNaN(minPrice) || price >= parseFloat(minPrice)) &&
      (isNaN(maxPrice) || price <= parseFloat(maxPrice));

    if (PriceInRange) {
      card.style.display = "block"; // If the title matches and the price is within the range, display the card
    } else {
      card.style.display = "none"; // If either the title doesn't match or the price is outside the range, hide the card
    }
  }
}

getItems(); // Call the getItems function to start the process
