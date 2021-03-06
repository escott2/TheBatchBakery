var obj = JSON.parse(product);
const donutObjects = obj.donuts;
const loadMenuBtn = document.querySelector(".js-load-menu");
const orderScreen = document.querySelector(".js-order-screen");
// let html = "";

//CALLBACK FUNCTIONS**************************************************************

//EDIT NEEDED: Add parameters for all variables accessed outside this function...
const generateContent = () => {
    let html = "";

  

    for (let i = 0; i < donutObjects.length; i++) {
        html += `
                <div class="col-lg-4 col-md-6">
                <div class="card my-4 custom-border--gray js-get-id js-product-${donutObjects[i]["id"]}">
                <h3 class=" text-center p-3 custom-color--gray js-product-name">${donutObjects[i]["name"]}</h3>
                <div class="card-body">
                `;
        html += `
                 <div class="d-flex flex-column align-items-center">
                    <div>
                    <p class="card-text text-center description mb-4">${donutObjects[i]["description"]}</p>
                    </div>
                    <img class="donut-menu-img w-75" src="img/${donutObjects[i]["img"]}" alt="${donutObjects[i]["alt"]}">
                    
                  </div>
                    <h4 class="my-3 p-2 w-50 mx-auto text-center">$${donutObjects[i]["price"]}0</h4>
                    <form name="product" class="product">
                    <div class="form-group d-flex flex-column align-items-center">

                      <label class="my-1 mr-2" for="qty">
                        <h4 class="d-inline-block">Quantity</h4>
                      </label>

                      <div class="w-100 d-flex justify-content-center pb-2">
                        <button aria-label="Decrease value" class="js-minus-btn" disabled>-</button>
                        <input type="text" value="0" id="qty" class="display-qty js-product-quantity">
                        <button aria-label="Increase value" class="js-add-btn custom-color--blue text-white">+</button>
                      </div>

                      <button type="button" class="btn mt-2 js-add-to-cart w-100 custom-color--blue text-white" id="js-product-${donutObjects[i]["id"]}">Add to Cart</button>

                    </div>
                  </form>
                    </div>
                    </div>
                    </div>
                    `;

    }

    // loadMenuBtn.classList.add("d-none");

    orderScreen.innerHTML = html;


}


//EVENT LISTENERS*********************************************************************************

// // window.addEventListener('load', generateContent);
// loadMenuBtn.addEventListener("click", () => {
//   generateContent();



// });

