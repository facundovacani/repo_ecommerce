function Saludar(){
    alert("Bienvenidos a e-Mercado, tu e-commerce favorito");
}
Saludar();
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("ingresar").addEventListener("click", function (e) {
        
        let bien = true;

        if (bien) {
            if (username.value && password.value) {
                window.location = "cover.html";
            } else {
                alert("Datos incompletos. Por favor, complete los campos");
            }
        }
    });
});