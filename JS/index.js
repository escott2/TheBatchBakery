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

function addProduct (array, buttonId, isAdd) {

    const productId = buttonId.substr(11);
    const productContainer = findProductContainer(buttonId);
    const qtySelector = productContainer.querySelector(".js-product-quantity");
    const qtyInputValue = Number(productContainer.querySelector(".js-product-quantity").value);
    const productObject = findProductObject(array, productId);
    const addToCartBtn = productContainer.querySelector(".js-add-to-cart");
    // const editBtn = productContainer.querySelector(".js-edit-btn");

    if (isAdd === false) {
        setQty(0, productObject);
    } else {
        setQty(qtyInputValue, productObject);
    }

    // addToCartBtn.classList.add("d-none");
    // editBtn.classList.remove("d-none");
    qtySelector.setAttribute("disabled", "")
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
    productObject.quantity = qtyInputValue;
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
            <div class="card py-2 mb-4">

                <div class="row my-3 pl-4 align-items-center justify-content-start">
                    <div class="col-12">
                    <h3 class="mb-4 pl-2 py-2 custom-color--gray">${donutObjects[i]["name"]} Donut</h3>
                    </div>
                    <div class="col-md-4 col-12 text-center">
                        <img class="cart__donut-img" src="img/${donutObjects[i]["img"]}"></img>
                    </div>
                    <div class="col-md-6 col-12">
                        <div class="row">
                            <div class="col-10  mx-auto mt-2">
                            <h4 class="d-inline">Price:</h4>
                            <p class="d-inline">$${donutObjects[i]["price"]}0</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-10  mx-auto mt-2">
                            <h4 class="d-inline">Quantity:</h4>
                            <p class="d-inline">${donutObjects[i]["quantity"]}</p>
                            </div>
                        </div>
                    </div>
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

    const addToCartBtntest = event.target;

    if (addToCartBtntest.classList.contains("js-add-to-cart")) {

        //unique id on button, importance: associated with unique class name on parent container. 
        const buttonId = addToCartBtntest.id;
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const addToCartBtn = product.querySelector(".js-add-to-cart");
        const addBtn =  product.querySelector(".js-add-btn");
        const minusBtn = product.querySelector(".js-minus-btn");
        const productQtyInput = product.querySelector(".display-qty");



        if (addToCartBtn.classList.contains("js-remove")) {
            addProduct(donutObjects, buttonId, false);
            addToCartBtn.textContent = "Add"
            addToCartBtn.classList.remove("js-remove", "custom-bg--orange");
            addToCartBtn.classList.add("custom-color--blue");
            product.classList.add("custom-border--gray");
            product.classList.remove("custom-border--orange");

            productQtyInput.value = 0;
            addBtn.removeAttribute("disabled");
            // generateOrderTotal(donutObjects, orderTotalDiv);


        } else {
            //--- TO ADD: if inputvalue is less than 1, animation/alert --- nothing added.  
            if (productQtyInput.value > 0) {
                addProduct(donutObjects, buttonId, true);
                addToCartBtn.textContent = "Remove";
                addToCartBtn.classList.remove("custom-color--blue");
                addToCartBtn.classList.add("js-remove", "custom-bg--orange");
                product.classList.remove("custom-border--gray");
                product.classList.add("custom-border--orange");

                minusBtn.setAttribute("disabled", "");
                addBtn.setAttribute("disabled", "");
                // generateOrderTotal(donutObjects, orderTotalDiv);
                menuContinueBtn.classList.remove("d-none");
            }
        }



        //Higher Order Function -- parameters will quickly fill in parameters below...)
        
        generateOrderTotal(donutObjects, orderTotalDiv);



        // menuContinueBtn.classList.remove("d-none");

        // addToCartBtn.classList.add("d-none");
        // editBtn.classList.remove("d-none");

        // minusBtn.setAttribute("disabled", "");
        // addBtn.setAttribute("disabled", "");

        event.preventDefault();
    }
        
    
}


// const editCart = (event) => {

//     const editBtn = event.target;

//     if (editBtn.classList.contains("js-edit-btn")) {

//         const product = event.target.parentNode.parentNode.parentNode.parentNode;
//         const addToCartBtn = product.querySelector(".js-add-to-cart");
//         const addBtn =  product.querySelector(".js-add-btn");
//         const minusBtn = product.querySelector(".js-minus-btn");

//         const productQuantitySelector = product.querySelector(".js-product-quantity");
        
//         //Toggle Buttons
//         addToCartBtn.classList.remove("d-none");
//         editBtn.classList.add("d-none");
//         // productQuantitySelector.removeAttribute("disabled", "")

//         minusBtn.removeAttribute("disabled");
//         addBtn.removeAttribute("disabled");

//         event.preventDefault();

//     }   
// }
// const removeProduct = (event) => {

//     const clickedBtn = event.target;

//     if (clickedBtn.classList.contains("js-edit-btn")) {

//         const product = event.target.parentNode.parentNode.parentNode.parentNode;
//         const addToCartBtn = product.querySelector(".js-add-to-cart");
//         const addBtn =  product.querySelector(".js-add-btn");
//         const minusBtn = product.querySelector(".js-minus-btn");

//         const productQtyInput = product.querySelector(".display-qty");
//         productQtyInput.value = 0;


//         // const productQuantitySelector = product.querySelector(".js-product-quantity");
        
//         //Toggle Buttons
//         addToCartBtn.classList.remove("d-none");
//         editBtn.classList.add("d-none");
//         // productQuantitySelector.removeAttribute("disabled", "")

//         minusBtn.removeAttribute("disabled");
//         addBtn.removeAttribute("disabled");

//         event.preventDefault();

//     }   
// }



const addQty = (event) => {
    const addBtn = event.target;
    if (addBtn.classList.contains("js-add-btn")) {
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const minusBtn = product.querySelector(".js-minus-btn");
        const productQtyInput = product.querySelector(".display-qty");
        let value = productQtyInput.value;
        let newValue = Number(value);
        newValue++;
        productQtyInput.value = newValue;

        if (newValue > 0) {
            minusBtn.removeAttribute("disabled");
        }

        event.preventDefault();
    }
}

const decreaseQty = (event) => {
    const minusBtn = event.target;
    if (minusBtn.classList.contains("js-minus-btn")) {
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const productQtyInput = product.querySelector(".display-qty");
        let value = productQtyInput.value;
        let newValue = Number(value);
        newValue--;
        productQtyInput.value = newValue;

        if (newValue < 1) {
            minusBtn.setAttribute("disabled", "");
        }

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
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

cartNav.addEventListener("click", () => {
    displayContent(cartDiv);
    generateCartContent(donutObjects, cartContentDiv);
    generateOrderTotal(donutObjects, cartTotalDiv);
});

//---Btn to Order Screen
loadMenuBtn.addEventListener("click", () => {
    displayContent(menuDiv);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

//END HOME PAGE EVENTS

//START ORDER SCREEN EVENTS

orderScreen.addEventListener("click", addQty);

orderScreen.addEventListener("click", decreaseQty);

orderScreen.addEventListener("click", addToCart);


// orderScreen.addEventListener("click", editCart);

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