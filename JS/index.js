// DECLARING VARIABLES********************

//---Div
const orderTotalDiv = document.querySelector(".js-order-screen-total");
const menuDiv = document.querySelector(".js-menu-div");
const cartDiv = document.querySelector(".js-cart-div");
const optionDiv = document.querySelector(".js-option-div");
const pickupFormDiv = document.querySelector(".js-pickup-form-div");
const deliveryFormDiv = document.querySelector(".js-delivery-form-div");
const cartContentDiv = document.querySelector(".js-cart-content");
const cartTotalDiv = document.querySelector(".js-cart-total");
const reviewDiv = document.querySelector(".js-review-div");
const reviewContentDiv = document.querySelector(".js-review-content-div");
const reviewTotalDiv = document.querySelector(".js-review-total");
const orderCompleteDiv = document.querySelector(".js-complete-div");
const homeDiv = document.querySelector(".js-home-div");


//---Btn
const homeNav = document.querySelector(".js-home-nav");
const orderNav = document.querySelector(".js-order-nav");
const cartNav = document.querySelector(".js-cart-nav");

const menuContinueBtn = document.querySelector(".js-menu-continue-btn");
const cartContinueBtn = document.querySelector(".js-cart-continue-btn");
const optionContinueBtn = document.querySelector(".js-option-continue-btn");
const pickupContinueBtn = document.querySelector(".js-pickup-continue-btn");
const deliveryContinueBtn = document.querySelector(".js-delivery-continue-btn");
const reviewContinueBtn = document.querySelector(".js-review-continue-btn");
const completeExitBtn = document.querySelector(".js-complete-exit-btn");

//---Form
const pickupForm = document.querySelector(".js-pickup-form");
const deliveryForm = document.querySelector(".js-delivery-form");


generateContent();


// FUNCTIONS **************************************************************
function displayContent(targetDiv) {
    let currentDiv = document.querySelector(".current-div");

    currentDiv.classList.remove("current-div");
    targetDiv.classList.add("current-div");
}

function addProduct (array, buttonId) {

    const productId = buttonId.substr(11);
    const productContainer = findProductContainer(buttonId);
    const qtySelector = productContainer.querySelector(".js-product-quantity");
    const qtyInputValue = Number(productContainer.querySelector(".js-product-quantity").value);
    const productObject = findProductObject(array, productId);
    const addToCartBtn = productContainer.querySelector(".js-add-to-cart");
    const editBtn = productContainer.querySelector(".js-edit-btn");

    const validQuantity = setQty(qtyInputValue, productObject);
    
    //NEED TO ADJUST --- Continue button should appear only if there is a total product quantity greater than 0. Must be able to change quantity to 0, to enable proper cart editing.
    if (validQuantity) {
        addToCartBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");
        qtySelector.setAttribute("disabled", "")
        return true;
    } else {
        return false;
    }
}

/**
 * Returns parent div with unique class name, matching button's ID. 
 * @param {string} ...
 */
function findProductContainer(buttonId) {
    const parentDiv = document.querySelector(`.${buttonId}`);
    return parentDiv;
}

/**
 * Returns object in array, by ID.
 * @param {Array<Object>} array The array of objects.
 * @param {number} productValue id value of an object.
 */
function findProductObject(array, productValue) {
    for (let i = 0; i < donutObjects.length; i++) {
        if (array[i]["id"] == productValue) {
            return donutObjects[i];
        }
    }
}

/**
 * Sets quantity value in object.
 * @param {} ...
 * @param {string} ...
 * 
 */
function setQty(qtyInputValue, productObject) {
    if (qtyInputValue > 0) {
        productObject.quantity = qtyInputValue;
        return true;
    } else {
        return false;
    }
}

/**
 * Returns total cost of order.
 * @param {Array<Object>} array The array of objects including quantity and total properties.
 */
function generateOrderTotal(array, displayDiv) {
    let totalHtml = "";
    let itemTotal = 0;
    let deliveryCharge = 0;
    let salesTax;
    let orderTotal;

    for (let i = 0; i < array.length; i++) {
        itemTotal += (array[i]["quantity"] * array[i]["price"]);
    }

    salesTax = itemTotal * 0.06875;
    orderTotal = itemTotal + deliveryCharge + salesTax;

    totalHtml += `
                <ul class="list-unstyled ml-4 mt-3">
                    <li><span class="font-weight-bold">Item Total:</span> $${itemTotal.toFixed(2)}</li>
                    <li><span class="font-weight-bold">Delivery:</span> $${deliveryCharge.toFixed(2)}</li>
                    <li><span class="font-weight-bold">Tax:</span> $${salesTax.toFixed(2)}</li>
                    <li><span class="font-weight-bold">Order Total:</span> $${orderTotal.toFixed(2)}</li>
                </ul>
                `;

    displayDiv.innerHTML = totalHtml;

}

function generateCartContent(array, showCartContentDiv) {

    let cartHtml = "";
    
    for (let i = 0; i < array.length; i++) {
    //if qty != 0, display object ["name"]["price"]["quantity"]
        if (donutObjects[i]["quantity"] > 0) {

        cartHtml += `
                <div class="row mt-3">
                    <div class="col-md-4 col-8">
                    <p>${donutObjects[i]["name"]}</p>
                    </div>
                    <div class="col-md-3 col-2">
                    <p>${donutObjects[i]["price"]}</p>
                    </div>
                    <div class="col-md-3 col-2">
                    <p>${donutObjects[i]["quantity"]}</p>
                    </div>
                </div>
                
                `
            }

        }

    showCartContentDiv.innerHTML = cartHtml;
}

function clearCart() {
    donutObjects.forEach (product => {product.quantity = 0});
}

// CALLBACK FUNCTIONS **************************************************************

const addToCart = (event) => {

    const addToCartBtn = event.target;

    if (addToCartBtn.classList.contains("js-add-to-cart")) {

        //unique id on button, importance: associated with unique class name on parent container. 
        const buttonId = addToCartBtn.id;

        //Higher Order Function -- parameters will quickly fill in parameters below...)
        const isValid = addProduct(donutObjects, buttonId);

        if (isValid) {
            generateOrderTotal(donutObjects, orderTotalDiv);
            menuContinueBtn.classList.remove("d-none");
        }

    }
        
        event.preventDefault();
    
}


const editCart = (event) => {

    const editBtn = event.target;

    if (editBtn.classList.contains("js-edit-btn")) {

        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const addToCartBtn = product.querySelector(".js-add-to-cart");
        const productQuantitySelector = product.querySelector(".js-product-quantity");
        
        //Toggle Buttons
        addToCartBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
        productQuantitySelector.removeAttribute("disabled", "")

        event.preventDefault();

    }   
}


//EVENT LISTENERS*************************************************************

//START HOME PAGE EVENTS

//---Navigation---

homeNav.addEventListener("click", () => {
    displayContent(homeDiv);
})

orderNav.addEventListener("click", () => {
    displayContent(menuDiv);
});

cartNav.addEventListener("click", () => {
    displayContent(cartDiv);
});

//---Btn to Order Screen
loadMenuBtn.addEventListener("click", () => {
    displayContent(menuDiv);
});

//END HOME PAGE EVENTS

//START ORDER SCREEN EVENTS

orderScreen.addEventListener("click", addToCart);

orderScreen.addEventListener("click", editCart);

//---Btn to Cart Screen
menuContinueBtn.addEventListener("click", () => {
    displayContent(cartDiv);

    generateCartContent(donutObjects, cartContentDiv);
    generateOrderTotal(donutObjects, cartTotalDiv);
});
//END ORDER SCREEN EVENTS

//---Btn to Option Screen
cartContinueBtn.addEventListener("click", () => {
    displayContent(optionDiv);
});

//---Btn to Pickup or Delivery Screens
optionContinueBtn.addEventListener("click", (event) => {

    const radioValue = document.querySelector('input[name="option"]:checked').value;
    event.preventDefault();

        if (radioValue === "pickup") {
            displayContent(pickupFormDiv);
         }
         else if (radioValue === "delivery") {
            displayContent(deliveryFormDiv);
         } 
});

//TO ADD -- Logic if user changes mind, can only choose one.***********************

//---Btn to Review Order Screen, from Pickup Screen
pickupContinueBtn.addEventListener("click", (event) => {
    event.preventDefault();
    generateCartContent(donutObjects, reviewContentDiv);
    generateOrderTotal(donutObjects, reviewTotalDiv);
    displayContent(reviewDiv);

})

//---Btn to Review Order Screen, from Delivery Screen
deliveryContinueBtn.addEventListener("click", (event) => {
    event.preventDefault();
    generateCartContent(donutObjects, reviewContentDiv);
    generateOrderTotal(donutObjects, reviewTotalDiv);
    displayContent(reviewDiv);
})

//---Btn to complete Order
reviewContinueBtn.addEventListener("click", () => {
    displayContent(orderCompleteDiv);
})

//---Btn to exit order
completeExitBtn.addEventListener("click", () => {
    displayContent(homeDiv);
    resetOrder();
})

function resetOrder() {
    orderScreen.innerHTML = "";
    orderTotalDiv.innerHTML = "";
    cartContentDiv.innerHTML = "";
    cartTotalDiv.innerHTML = "";
    reviewTotalDiv.innerHTML = "";

    clearCart();
    generateContent();

    pickupForm.reset();
    deliveryForm.reset();

    menuContinueBtn.classList.add("d-none");

}