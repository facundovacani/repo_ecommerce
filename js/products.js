var productsArray = [];
const ORDER_ASC_DOLAR = "UPDOLAR"
const ORDER_DESC_DOLAR = "DODOLAR"
const ORDER_DESC_SOLD = "Ventas"
var minCost = undefined
var maxCost = undefined

function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_DOLAR) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0;
            });

    } else if (criterio === ORDER_DESC_DOLAR) {
        result = array.sort(

            function (a, b) {
                if (a.cost > b.cost) {
                    return -1;
                }
                if (a.cost < b.cost) {
                    return 1;
                }
                return 0;
            });

    } else if (criterio === ORDER_DESC_SOLD) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        })
    }
    return result;
}

function showProductList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)))

            htmlContentToAppend += `
        <div class="col-lg-4 col-md-6 col-sm-6 card-deck">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                
                    <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                
                <div class="card-body">
                    
                        <div class="card-text">
                        <h4>`+ product.name + "  -  " + product.cost + ` USD</h4>
                        <p>`+ product.description + `</p>
                        </div>
                        <div class"d-flex justify-content-between align-items-center">
                        
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                   

                </div>
            </a>
        </div>
        `

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend; // acá buscaba el id "cat-list.contain"
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            productsArray = sortProducts(ORDER_ASC_DOLAR, productsArray);
            showProductList(productsArray);
        }

    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_ASC_DOLAR, productsArray);

        showProductList(productsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_DOLAR, productsArray);

        showProductList(productsArray);
    });
    document.getElementById("sortByCount").addEventListener("click", function () {
        productsArray = sortProducts(ORDER_DESC_SOLD, productsArray);

        showProductList(productsArray);
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {


        minCost = document.getElementById("rangeFilterCountMin").value;
        maxCost = document.getElementById("rangeFilterCountMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductList(productsArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductList(productsArray);
    });

});