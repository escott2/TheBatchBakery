const orderScreen = document.querySelector(".js-order-screen");
let order = [];

const addProduct = (event) => {

    if (event.target.tagName == 'BUTTON') {

        const button = event.target;
        const product = event.target.parentNode.parentNode.parentNode;
        // const getProductName = product.querySelector(".js-product-name").textContent;
        const getQuantity = product.querySelector(".js-product-quantity").value;
        // const getID = product.donutObjects.findIndex(x => x.name === 'Vanilla');
        // const getPrice = product.querySelector(".js-unit-price").textContent;

        event.preventDefault();
        // console.log("test");

        // let productData = {
        //     // name: getProductName,
        //     quantity: getQuantity,
        //     // price: getPrice,
        // }
        // order.push(productData);


        console.log(getQuantity);
        // console.log(getID);


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