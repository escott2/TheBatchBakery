document.addEventListener('DOMContentLoaded', () => {

    const loadMenu = document.querySelector(".js-load-menu");
    var obj = JSON.parse(product);
    // const donutObjects = Object.values(obj);
    const donutObjects = obj.donuts;

    let titleContent = document.querySelector(".test");
    let html = "";






    const generateContent = () => {
        // if (event.target.tagName == 'BUTTON') {

        for (let i = 0; i < donutObjects.length; i++) {
            // console.log(donutObjects[i]["name"]);
            html += `
                <div class="col-lg-4 col-md-6">
                <div class="card">
                <div class="card-body">
                `;
            html += `
                    <h5 class="card-title">${donutObjects[i]["name"]}</h5>
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

        titleContent.innerHTML = html;


        // for (let i = 0; i < donutObjects.length; i++) {
        //     //enters first array
        //     console.log("test");

        //     for (let y = 0; y < donutObjects[i].length; y++) {
        //         // enters objects within array


        //         console.log(donutObjects[i][y].name);
        // console.log(donutObjects);

        // console.log(donutObjects[i].name);
        // html += `
        //     <h5 class="card-title">${product[i]["name"]}</h5>

        //     </div>
        //     </div>
        //     </div>`;

        // titleContent.innerHTML = html;

        //     }
        // }
        // }
    }





    console.log(donutObjects);


    // console.log(obj);
    // console.log(donutObjects);
    // console.log(html)


    loadMenu.addEventListener("click", generateContent);


})