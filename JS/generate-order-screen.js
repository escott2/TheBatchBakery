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
                <div class="card mt-4 js-get-id js-product-${donutObjects[i]["id"]}">
                <div class="card-body">
                `;
        html += `
                 <div class="d-flex justify-content-between">
                    <div>
                    <h5 class="card-title js-product-name">${donutObjects[i]["name"]}</h5>
                    <p class="card-text">${donutObjects[i]["description"]}</p>
                    </div>
                    <img class="donut-menu-img w-25 pl-3" src="img/donut.svg">
                  </div>
                    <h6 class="mt-3">Price: $${donutObjects[i]["price"]}0</h6>
                    <form name="product" class="product">
                    <div class="form-group">

                      <label class="my-1 mr-2" for="qty">
                        <h6 class="d-inline-block">Quantity</h6>
                      </label>
                      <button aria-label="Decrease value" class="js-minus-btn" disabled>-</button>
                      <input type="text" value="0" id="qty" class="display-qty js-product-quantity">
                      <button aria-label="Increase value" class="js-add-btn">+</button>

                      <button type="button" class="btn btn-dark mt-2 js-add-to-cart" id="js-product-${donutObjects[i]["id"]}">Add</button>
                      <button type="submit" class="btn btn-danger d-none js-edit-btn mt-2">Edit</button>

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

