const addItem = document.getElementById("vcc-qty");
const addButton = document.querySelectorAll(".js-add-to-cart");
const orderScreen = document.querySelector(".js-order-screen");

orderScreen.addEventListener("click", (event) => {
    if (event.target.tagName == 'BUTTON') {
        const prevSib = event.target.previousElementSibling;
        console.log(prevSib.value);
    }
});