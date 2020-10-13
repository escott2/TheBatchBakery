let orderTotalDiv = document.querySelector(".js-order-screen-total");

//Begin findProductObject Variables
// const button = event.target;
// const product = event.target.parentNode.parentNode.parentNode.parentNode;
// const productID = product.id;
// const productQuantity = Number(product.querySelector(".js-product-quantity").value);
// const productData = findProductObject(donutObjects, productID);
// const productEditBtn = product.querySelector(".js-edit-btn");
//End findProductObject Variables

//REFACTORING

//Access all add to cart buttons - these can be targeted with event in callback function. 
const addToCartBtns = document.getElementsByClassName("js-add-to-cart");
// const product;
// const productID;
// const productQty;
// const productData;
// const productEditBtn;











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
 * Returns total cost of order.
 * @param {Array<Object>} array The array of objects including quantity and total properties.
 */
function orderTotal(array) {
    let totalHtml = "";
    let itemTotal = 0;
    let deliveryCharge = 5.00
    let salesTax;
    let orderTotal;


    for (let i = 0; i < array.length; i++) {
        itemTotal += (array[i]["quantity"] * array[i]["price"]);
    }

    salesTax = itemTotal * 0.06875;
    orderTotal = itemTotal + deliveryCharge + salesTax;

    return totalHtml += `
                    <ul class="list-unstyled">
                        <li>Item Total: $${itemTotal.toFixed(2)}</li>
                        <li>Delivery: $${deliveryCharge.toFixed(2)}</li>
                        <li>Tax: $${salesTax.toFixed(2)}</li>
                        <li> Order Total: $${orderTotal.toFixed(2)}</li>
                    </ul>
                    `;
}


//CALLBACK FUNCTIONS**************************************************************

//EDIT - Self contain
const addProduct = (event) => {

    const addToCartBtn = event.target;

    if (addToCartBtn.classList.contains("js-add-to-cart")) {

        const addToCartBtn = event.target;
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const productID = product.id;
        const productQuantitySelector = product.querySelector(".js-product-quantity");
        const productQuantity = Number(product.querySelector(".js-product-quantity").value);
        const productData = findProductObject(donutObjects, productID);
        const editBtn = product.querySelector(".js-edit-btn");

        productData.quantity = productQuantity;

        console.log(donutObjects);

        //Update Order Total
        orderTotalDiv.innerHTML = orderTotal(donutObjects);

        //Toggle Buttons
        addToCartBtn.classList.add("d-none");
        editBtn.classList.remove("d-none");

        productQuantitySelector.setAttribute("disabled", "")


        event.preventDefault();

    }
}

const editCart = (event) => {

    const editBtn = event.target;

    if (editBtn.classList.contains("js-edit-btn")) {

        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const addToCartBtn = product.querySelector(".js-add-to-cart");
        const productQuantitySelector = product.querySelector(".js-product-quantity");

        console.log("test");
        
        //Toggle Buttons
        addToCartBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");

        productQuantitySelector.removeAttribute("disabled", "")

        event.preventDefault();

    }   
}


//EVENT LISTENERS*************************************************************



orderScreen.addEventListener("click", addProduct);



//edit button event listener>
// -- when clicked, edit button add class display none, add-to-cart button remove display none class. 
orderScreen.addEventListener("click", editCart);