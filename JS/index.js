// DECLARING VARIABLES********************
//---Div
const orderTotalDiv = document.querySelector(".js-order-screen-total");
const menuDiv = document.querySelector(".js-menu-div");
const cartFormDiv = document.querySelector(".js-cart-div");
const optionDiv = document.querySelector(".js-option-div");
const pickupFormDiv = document.querySelector(".js-pickup-form-div");
const deliveryFormDiv = document.querySelector(".js-delivery-form-div");
const cartContentDiv = document.querySelector(".js-cart-content");
const cartTotalDiv = document.querySelector(".js-cart-total");



//---Btn
const menuContinueBtn = document.querySelector(".js-menu-continue-btn");
const cartContinueBtn = document.querySelector(".js-cart-continue-btn");
const optionContinueBtn = document.querySelector(".js-option-continue-btn");
const pickupContinueBtn = document.querySelector(".js-pickup-continue-btn");
const deliveryContinueBtn = document.querySelector(".js-delivery-continue-btn");



// FUNCTIONS **************************************************************

function addProduct (array, buttonId) {

    const productId = buttonId.substr(11);
    const productContainer = findProductContainer(buttonId);
    const qtySelector = productContainer.querySelector(".js-product-quantity");
    const qtyInputValue = Number(productContainer.querySelector(".js-product-quantity").value);
    const productObject = findProductObject(array, productId);
    const addToCartBtn = productContainer.querySelector(".js-add-to-cart");
    const editBtn = productContainer.querySelector(".js-edit-btn");

    setQty(qtyInputValue, productObject);

    //toggleButtons(addToCartBtn, editBtn);
    addToCartBtn.classList.add("d-none");
    editBtn.classList.remove("d-none");
    qtySelector.setAttribute("disabled", "")


    console.log(array);

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




// CALLBACK FUNCTIONS **************************************************************

//EDIT - Self contain. Imagine using this for other array of objects. How can I change this so it's reusable.

const addToCart = (event) => {

    const addToCartBtn = event.target;

    if (addToCartBtn.classList.contains("js-add-to-cart")) {

        //unique id on button, importance: associated with unique class name on parent container. 
        const buttonId = addToCartBtn.id;

        //Higher Order Function -- parameters will quickly fill in parameters below...)

        addProduct(donutObjects, buttonId);
        generateOrderTotal(donutObjects, orderTotalDiv);
        menuContinueBtn.classList.remove("d-none");
        
        event.preventDefault();


        // function addProdutTest (array) {

        // const buttonId = addToCartBtn.id;
        // const productContainer = findProductContainer(buttonId);
        // const qtySelector = productContainer.querySelector(".js-product-quantity");
        // const qtyInputValue = Number(productContainer.querySelector(".js-product-quantity").value);
        // //EDIT NEEDED, this one is accessing donutObjects... figure another way to access, return this array maybe. 
        // const productObject = findProductObject(donutObjects, buttonId);
        // const editBtn = productContainer.querySelector(".js-edit-btn");

        // setQty(qtyInputValue, productObject);

        // //Update Order Total --- EDIT NEEDED, Outside variable
        // orderTotalDiv.innerHTML = orderTotal(donutObjects);

        // //Toggle Buttons
        // addToCartBtn.classList.add("d-none");
        // editBtn.classList.remove("d-none");

        // qtySelector.setAttribute("disabled", "")

        // console.log(donutObjects);

        // event.preventDefault();

        // }
    }
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



orderScreen.addEventListener("click", addToCart);

//edit button event listener>
// -- when clicked, edit button add class display none, add-to-cart button remove display none class. 
orderScreen.addEventListener("click", editCart);

menuContinueBtn.addEventListener("click", () => {
    generateCartContent(donutObjects, cartContentDiv);
    hideDiv(menuDiv);
    showDiv(cartContentDiv);
    generateOrderTotal(donutObjects, cartTotalDiv);
});




optionContinueBtn.addEventListener("click", (event) => {

    const radioValue = document.querySelector('input[name="option"]:checked').value;
    event.preventDefault();

    hideDiv(optionDiv);

        if (radioValue === "pickup") {
            showDiv(pickupFormDiv)
         }
         else if (radioValue === "delivery") {
            showDiv (deliveryFormDiv);
         } 

});

// pickupContinueBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     hideDiv(pickupFormDiv);
//     showDiv();  
// })

// deliveryContinueBtn.addEventListener("click", (event) => {
    //event.preventDefault();
    // hideDiv(deliveryFormDiv);
    // showDiv();
// })


function hideDiv(divToHide) {
    divToHide.classList.add("d-none");
}

function showDiv(divtoShow) {
    divtoShow.classList.remove("d-none");
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

