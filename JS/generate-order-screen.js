var obj = JSON.parse(product);
const donutObjects = obj.donuts;
const loadMenuBtn = document.querySelector(".js-load-menu");
const orderScreen = document.querySelector(".js-order-screen");
let html = "";




//CALLBACK FUNCTIONS

const generateContent = () => {

    for (let i = 0; i < donutObjects.length; i++) {
        html += `
                <div class="col-lg-4 col-md-6">
                <div class="card js-get-id" id="${donutObjects[i]["id"]}">
                <div class="card-body">
                `;
        html += `
                    <h5 class="card-title js-product-name">${donutObjects[i]["name"]}</h5>
                    <p class="card-text">${donutObjects[i]["description"]}</p>
                    <h6>Price: $${donutObjects[i]["price"]}0</h6>
                    <form name="product" class="product">
                    <div class="form-group">
                      <label class="my-1 mr-2" for="vcc-qty">
                        <h6>Quantity</h6>
                      </label>
                      <select class="custom-select my-1 mr-sm-2 js-product-quantity" id="vcc-qty" name="quantity">
                        <option selected>Choose...</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10 - limit</option>
                      </select>
                      <button type="submit" class="btn btn-dark js-add-to-cart mt-2">Add to Cart</button>
                    </div>
                  </form>
                    </div>
                    </div>
                    </div>
                    `;

    }

    loadMenuBtn.classList.add("d-none");

    orderScreen.innerHTML = html;


}


//EVENT LISTENERS

loadMenuBtn.addEventListener("click", generateContent);


// })