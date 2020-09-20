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

    }   else if (criterio === ORDER_DESC_DOLAR) {
        result = array.sort(

            function (a, b) {
                if (a.cost > b.cost){
                    return -1;
                }
                if (a.cost < b.cost){
                    return 1;
                }
                return 0;
            });
        
    } else if (criterio === ORDER_DESC_SOLD) {
        result = array.sort(function (a, b){
            if (a.soldCount > b.soldCount) {return -1;} 
            if (a.soldCount < b.soldCount) {return 1;}
            return 0;
        })
    }
    return result;
}

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)))

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + "  -  " +  product.cost + ` USD</h4>
                        <p>`+ product.description  +`</p>
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    
                    </div>

                </div>
            </div>
        </a>
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