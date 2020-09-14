var coche = {};
var comentarioArray = [];

function mostrarAuto(coche, comentarios){
    let info = " ";
    let img = " ";
    let comentario = " ";

 info += `<h2> ${coche.name} </h2>
          <p> ${coche.description} </p>`

    img += `<img src="${coche.images[0]}" width="400">;
    <img src="${coche.images[1]}" width="400">;
    <img src="${coche.images[4]}" width="400">;
    <img src="${coche.images[2]}" width="400">;
    <img src="${coche.images[3]}" width="400">; <br>
    <br><br><hr>
       `;

       comentarios.forEach(function (comentar) {

        let puntuación = " ";
 
        comentario += `<h5>${comentar.user}</h5> <br>
                        <p>${comentar.description}</p>
                `;
                for(let i = 1; i <= comentar.score; i++){
                    puntuación += `<span class="fa fa-star checked"></span>`;
                }
                for(let i = comentar.score + 1; i <= 5; i++){
                    puntuación +=`<span class="fa fa-star"></span>`;
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
document.addEventListener("DOMContentLoaded", function(e){

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


});