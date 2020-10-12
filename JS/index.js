// const orderScreen = document.querySelector(".js-order-screen");
// let order = [];
let orderTotalDiv = document.querySelector(".js-order-screen-total");


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

//EDIT NEEDED: Add parameters for all variables accessed outside this function...
const addProduct = (event) => {

    if (event.target.tagName == 'BUTTON') {

        const button = event.target;
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const productID = product.id;
        const productQuantity = Number(product.querySelector(".js-product-quantity").value);
        const productData = findProductObject(donutObjects, productID);

        productData.quantity = productQuantity;

        console.log(donutObjects);

        orderTotalDiv.innerHTML = orderTotal(donutObjects);


        event.preventDefault();
        button.disabled = true;


    }
}



//EVENT LISTENERS*************************************************************

orderScreen.addEventListener("click", addProduct);