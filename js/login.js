document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("ingresar").addEventListener("click", function(e){

        let bien = true;
    
      
        if (bien){
            if(email.value || password.value){
            window.location = "index.html";
            }else {
                alert("Datos incompletos, por favor, complete los campos");
            }
        }
    });
    });