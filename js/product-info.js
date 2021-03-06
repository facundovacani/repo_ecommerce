var coche = {};
var comentarioArray = [];
var relacionado = [];

function relacionados(listaProductos, relaciones) {
    let relacionadosConProducto = "";


    relaciones.forEach(function (i) {
        relacionadosConProducto += `<div>
        <a href="product-info.html" class="list-group-item list-group-item-action"  >
        <div class="row">
        <div class="col-3">
        <img src="${listaProductos[i].imgSrc}"width="250"<br>
        </div>
        <div class="col">
            <div class=" d-flex w-100 justify-content-between">
                <div class="mb-1">
                <h4>${listaProductos[i].name}</h4>
                <p>${listaProductos[i].description}  A un precio un buen precio de ${listaProductos[i].cost} USD al contado</p><br>
                <small class="text-muted" style="float: right;"> ${listaProductos[i].cost} USD</small> <br>
                <small class="text-muted" style="float: right;"> ${listaProductos[i].soldCount} vendidos</small>
                </div>
        </div>
        </div>
        </div>
        </a> 
        </div>
        `
    });

    document.getElementById("relacionado").innerHTML = relacionadosConProducto;
};

function mostrarAuto(coche, comentarios) {
    let info = " ";
    let img = " ";
    let comentario = " ";

    info += `<h2> ${coche.name} </h2>
          <p> ${coche.description} </p>`

    img += `
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="${coche.images[0]}" class="d-block w-100"
                    alt="...">
                <div class="carousel-caption d-none d-md-block">
                <h5>Chevrolet Onix Joy </h5>
                    <p>Potenciá tu actitud con Onix Joy. </p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="${coche.images[1]}"
                    class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>
            <div class="carousel-item">
                <img src="${coche.images[4]}"
                    class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>
            <div class="carousel-item">
                <img src="${coche.images[2]}"
                    class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                </div>
            </div>
            <div class="carousel-item">
                <img src="${coche.images[3]}"
                    class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
       `;

    comentarios.forEach(function (comentar) {

        let puntuación = " ";

        comentario += `<h5>${comentar.user}</h5> <br>
                        <p>${comentar.description}</p>
                `;
        for (let i = 1; i <= comentar.score; i++) {
            puntuación += `<span class="fa fa-star checked"></span>`;
        }
        for (let i = comentar.score + 1; i <= 5; i++) {
            puntuación += `<span class="fa fa-star"></span>`;
        }

        comentario += `<sub>${comentar.dateTime}</sub><br>`;
        comentario += `<div style="text-align: right;"> ${puntuación}</div><hr>`;

    });


    document.getElementById("info-auto").innerHTML = info;
    document.getElementById("imagen-auto").innerHTML = img;
    document.getElementById("comentario-auto").innerHTML = comentario;

}






//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentarioArray = resultObj.data;

        }
    })


    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            coche = resultObj.data;
            mostrarAuto(coche, comentarioArray);
        }
    })

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            relacionado = resultObj.data;
            relacionados(relacionado, coche.relatedProducts);
        }
    })


});