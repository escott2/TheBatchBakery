const orderScreen = document.querySelector(".js-order-screen");
let order = [];

const addProduct = (event) => {

    if (event.target.tagName == 'BUTTON') {

        const button = event.target;
        const product = event.target.parentNode.parentNode.parentNode;
        const getProductName = product.querySelector(".js-product-name").textContent;
        const getQuantity = product.querySelector(".js-product-quantity").value;
        const getPrice = product.querySelector(".js-unit-price").textContent;

        event.preventDefault();

        let productData = {
            name: getProductName,
            quantity: getQuantity,
            price: getPrice,
        }
        order.push(productData);

        button.disabled = true;

    }
}

orderScreen.addEventListener("click", addProduct);

console.log(order);





// orderScreen.addEventListener("click", (event) => {

//     event.preventDefault();
//     if (event.target.tagName == 'BUTTON') {

//         const product = event.target.parentNode.parentNode.parentNode;
//         const getProductName = product.querySelector(".js-product-name").textContent;
//         const getQuantity = product.querySelector(".js-product-quantity").value;
//         const getPrice = product.querySelector(".js-unit-price").textContent;


//         console.log(getProductName);
//         console.log(getPrice);
//         console.log(getQuantity);


//     }
// });