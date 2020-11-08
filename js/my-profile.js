//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let perfil = localStorage.getItem("perfil");

    if (perfil) {

        perfil = JSON.parse(perfil);

        document.getElementById("nombrePerfil").value = perfil.nombre;
        document.getElementById("apellidoPerfil").value = perfil.apellido;
        document.getElementById("emailPerfil").value = perfil.email;
        document.getElementById("edadPerfil").value = perfil.edad;
        document.getElementById("telefonoPerfil").value = perfil.telefono;


    }

   

    document.getElementById("guardarCambios").addEventListener("click", function (e) {
        let validado = true
        let nombre = document.getElementById("nombrePerfil");
        let apellido = document.getElementById("apellidoPerfil");
        let email = document.getElementById("emailPerfil");
        let edad = document.getElementById("edadPerfil");
        let telefono = document.getElementById("telefonoPerfil");

        let alerta = `<br> 
        <div class="alert alert-danger alert-dismissible show" role="alert">
          <strong>Datos obligatorios no ingresados. Por favor, llene los espacios marcados en rojo.</strong><button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        </div>
        `
        
        if (validado) {
            if(nombre.value&&apellido.value&&email.value&&edad.value&&telefono.value){

            
            localStorage.setItem("perfil", JSON.stringify({
                nombre: nombre.value,
                apellido: apellido.value,
                edad: edad.value,
                email: email.value,
                telefono: telefono.value
            }));
            window.location = "my-profile.html"
        }else{
            document.getElementById("alertaPerfil").innerHTML = alerta  ;
        }

            
        }


    });


    document.getElementById("exit").addEventListener("click", function () {
        localStorage.removeItem("perfil");
        window.location = "index.html";
    })





    var usuarioLogueado = localStorage.getItem("Usuario-Logueado");

    if (usuarioLogueado != null) {
        document.getElementById("nickUser").innerHTML = '<h2 style="text-align: center; color: #d41c6c ;">Perfil de ' + usuarioLogueado + '.</h2>'
    } else {
        document.getElementById("nickUser").innerHTML = '<h2 style="text-align: center; color: red;">No hay usuario registrado.</h2>'
    }
});