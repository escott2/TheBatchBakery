// const orderScreen = document.querySelector(".js-order-screen");
// let order = [];

function findProductObject(array, productValue) {
    for (let i = 0; i < donutObjects.length; i++) {
        if (array[i]["id"] == productValue) {
            return donutObjects[i];
        }
    }
}

const addProduct = (event) => {

    if (event.target.tagName == 'BUTTON') {

        const button = event.target;
        const product = event.target.parentNode.parentNode.parentNode.parentNode;
        const productID = product.id;
        const productQuantity = Number(product.querySelector(".js-product-quantity").value);
        const productData = findProductObject(donutObjects, productID);

        productData.quantity = productQuantity;

        console.log(donutObjects);

        event.preventDefault();
        button.disabled = true;

    }
}

orderScreen.addEventListener("click", addProduct);