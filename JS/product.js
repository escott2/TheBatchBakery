document.addEventListener('DOMContentLoaded', () => {

    const loadMenu = document.querySelector(".js-load-menu");
    var obj = JSON.parse(product);
    // const donutObjects = Object.values(obj);
    const donutObjects = obj.donuts;

    let titleContent = document.querySelector(".test");
    let html = "";






    const generateContent = (event) => {
        if (event.target.tagName == 'BUTTON') {

            for (let i = 0; i < donutObjects.length; i++) {
                console.log(donutObjects[i]["name"]);
                html += `
                <div class="col-sm">
                <div class="card">
                <div class="card-body">
                `;
                html += `
                    <h5 class="card-title">${donutObjects[i]["name"]}</h5>
    
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
        }
    }





    console.log(donutObjects);


    // console.log(obj);
    // console.log(donutObjects);
    // console.log(html)


    loadMenu.addEventListener("click", generateContent);


})