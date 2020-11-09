//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/1200/public/media/image/2018/08/fotos-perfil-whatsapp_16.jpg?itok=fl2H3Opv
// url de la foto



var imageVal = document.getElementById("inputFoto");
var botonProfile = document.getElementById("botonPerfil");
document.addEventListener("DOMContentLoaded", function (e) {

    let newProfile = localStorage.getItem("Usuario");

    if (newProfile) {
        newProfile = JSON.parse(newProfile);

        document.getElementById("nombrecito").value = newProfile.name;
        document.getElementById("apellidito").value = newProfile.apell;
        document.getElementById("eda").value = newProfile.edad;
        document.getElementById("correo").value = newProfile.direccion;
        document.getElementById("tel").value = newProfile.numero;
        document.getElementById("inputFoto").value = newProfile.picture;

        if (newProfile.picture != ""){

            document.getElementById("foto").src = newProfile.picture;
        }
    }

    botonProfile.addEventListener("click", function (e) {


        var nom = document.getElementById("nombrecito");
        var lastName = document.getElementById("apellidito");
        var agee = document.getElementById("eda");
        var dirMail = document.getElementById("correo");
        var numContacto = document.getElementById("tel");
        var validado = true;

        if (nom.value.trim() === "") {
            validado = false;
        }
        if (lastName.value.trim() === "") {
            validado = false;
        }
        if (agee.value.trim() === "") {
            validado = false;
        }
        if (dirMail.value.trim() === "") {
            validado = false;
        }
        if (numContacto.value.trim() === "") {
            validado = false;
        }
        if (validado) {
            localStorage.setItem("Usuario",
                JSON.stringify({
                    name: nom.value,
                    apell: lastName.value,
                    edad: agee.value,
                    direccion: dirMail.value,
                    numero: numContacto.value,
                    picture: imageVal.value
                }));
            console.log({ localStorage });
            window.location = "my-profile.html"
        }

    });
});
