document.addEventListener('DOMContentLoaded', () => {

    var obj = JSON.parse(product);
    let titleContent = document.querySelector(".test");
    let html = `<div class="col-sm">
                    <div class="card">
                        <div class="card-body">`;
    
    html +=                 `<h5 class="card-title">${obj.donuts[0].name}</h5>`;


    html +=         `</div>
                </div>
            </div>`;


    titleContent.innerHTML = html;

    console.log(obj);

})

