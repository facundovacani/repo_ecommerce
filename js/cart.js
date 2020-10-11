
let carritoArray = [];


function calculoSubt(precio){
    let cuenta = parseInt(document.getElementById("subtot").value);
    subtot = cuenta * precio;
    document.getElementById("preciosub").innerHTML = subtot;
}

function muestraCarro(array){

    let content = " ";

    for(let i = 0; i < array.length; i++){

        let articulos = array [i];

        let calculoS = (articulos.unitCost * articulos.count);

        content += `
        <tr>
            <td><img src="${articulos.src}" width="105px"></td>
            <td>${articulos.name}</td>
            <td>${articulos.unitCost}</td>
            <td><input style="width:80px;" id="subtot" onchange="calculoSubt(${articulos.unitCost})" type="number"  value="${articulos.count}" min="1"></td>
            <td><span id="preciosub" style="font-weight:bold;">${calculoS}</span></td>
        </tr>
        `

        document.getElementById("carrito").innerHTML = content;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if(resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;
            muestraCarro(carritoArray);
        }
    })

});
