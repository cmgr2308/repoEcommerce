//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    
    
    botonEnviar.addEventListener("click", function(e){

        var botonEnviar = document.getElementById("botonEnviar");
        var name = document.getElementById("inputName");
        var pssw = document.getElementById("inputPassword");
        var validacion = true;   
        
         if (name.value.trim()===""){
             validacion = false;
           alert('No debes tener espacios en blanco!');
           
        }
        
         if (pssw.value.trim()===""){
             validacion = false;
           alert('No debes tener espacios en blanco!');
           
        }

        if (validacion) {
            localStorage.setItem("User",JSON.stringify({ user: name.value }));
            console.log({ localStorage });
            window.location = "cover.html";
        }
        
        
    });  

});

