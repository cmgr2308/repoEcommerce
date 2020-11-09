

var carrito = [];


// VARIABLES DATOS
var street = document.getElementById("calle");
var doorNumber = document.getElementById("numPuerta");
var corner = document.getElementById("esq");
var country = document.getElementById("pais");

// VARIABLES ALERTAS 
var success = document.getElementById("exito");
var failure = document.getElementById("fracaso");

// VARIABLES MODAL
var nom = document.getElementById("nombre");
var cardNumber = document.getElementById("numTarjeta");
var code = document.getElementById("codigo");
var bankNumber = document.getElementById("numBanco");

function totalCost() {
    let total = 0;
    let cantidadSub = document.getElementsByClassName("total");
    for (let i = 0; i < cantidadSub.length; i++) {
        total += parseInt(cantidadSub[i].innerHTML);
    }

    document.getElementById("sumaTot").innerHTML = total;
}

function subCost(unitCost, i) {
    let count = parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSub${i}`).innerHTML = subTot;

    totalCost();
    costoEnvio();

}

function unicaMoneda(unitCost, currency) {
    if (currency === "UYU") {
        return unitCost / 40;
    } else
        return unitCost
}


//------------------------------------- COSTO DEL ENVIO 
function costoEnvio() {
    let sumaTo = parseInt(document.getElementById("sumaTot").innerHTML);
    let envio = "";
    let element = document.getElementsByName("envio");
    let contenidito = "";
    for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
            envio = parseInt(element[i].value);
        }
    }

    let costoEnvio = (envio * sumaTo) / 100

    let costoConEnvio = sumaTo + costoEnvio

    contenidito +=
        `
    <td>${sumaTo}</td>
    
    <td>${costoEnvio}</td>

    <td colspan="2">${costoConEnvio}</td>
    
    `

    document.getElementById("tablaEnvio").innerHTML = contenidito;

}

//------------------------------------ Cambio de tipo de envio. Agrego un eventlistener para que 
// al momento de apretar el boton cambie los descuentos

let botonEnvio = document.getElementsByName("envio");
for (var i = 0; i < botonEnvio.length; i++) {
    botonEnvio[i].addEventListener("change", function () {
        costoEnvio();
    });
}

function showArticles(atributos) {
    let content = "";

    for (let i = 0; i < atributos.length; i++) {

        let articles = atributos[i];

        let costoDolar = unicaMoneda(articles.unitCost, articles.currency);
        let subT = costoDolar * articles.count;

        content +=
            `
        <div >
        <table id="tabla">
        <tr>
        <td id="entrada1"><div ><img src='${articles.src}' width="150px"></div></td>

        <td id="entrada2" style="width: 150px;" ><strong>${articles.name}</strong></td> 

        <td id="entrada" style="width: 150px;" >${articles.unitCost}${articles.currency}</td> 

        <td id="entrada3" style="text-align: center; width: 150px;"><input style="width:60px;" onchange="subCost(${costoDolar}, ${i})" 
        type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>

        <td id="entrada4" style="text-align: center; width: 150px;">Subtotal:<br><span id="sumaSub${i}" class="total" style="font-weight:bold;">${subT}</span>USD</td>

        </tr>
        `
        document.getElementById("lista").innerHTML = content;
    }

    totalCost();

}

// ---------------------------------------------- METODO DE PAGO -----------------------
function metodoPago() {
    var botonPago = document.getElementsByName("botonMetodoPago");
    for (var i = 0; i < botonPago.length; i++) {
        if (botonPago[i].checked && (botonPago[i].value == "1")) {
            document.getElementById("divCredito").classList.remove("d-none");
            document.getElementById("divBanco").classList.add("d-none");
            
        } else if (botonPago[i].checked && (botonPago[i].value == "2")) {
            document.getElementById("divCredito").classList.add("d-none");
            document.getElementById("divBanco").classList.remove("d-none");
            
        }

    }
}





// ---------------------------------------------------- VALIDACION MODAL

let botonModal = document.getElementById("botonConfirmar");
botonModal.addEventListener("click", function (e) {


    let validacion = true;

    let botoncito = document.getElementsByName("botonMetodoPago");

    for (var i=0; i<botoncito.length; i++){
        if (botoncito[i].checked && botoncito[i].value == "1"){
            if (nom.value.trim() === "") {
                validacion = false;
                nom.classList.add("is-invalid");
                failure.classList.remove("d-none");
                failure.classList.add("d-block");
            }
        
            if (cardNumber.value.trim() === "") {
                validacion = false;
                cardNumber.classList.add("is-invalid");
                failure.classList.remove("d-none");
                failure.classList.add("d-block");
            }
        
            if (code.value.trim() === "") {
                validacion = false;
                code.classList.add("is-invalid");
                failure.classList.remove("d-none");
                failure.classList.add("d-block");
            }
            else if (botoncito[i].checked && botoncito[i].value == "2"){
                if (bankNumber.value.trim() === "") {
                    validacion = false;
                    bankNumber.classList.add("is-invalid");
                    failure.classList.remove("d-none");
                    failure.classList.add("d-block");

            }

        }
    }
    
    } if
        (validacion) {
            failure.classList.remove("d-block");
            failure.classList.add("d-none");
            success.classList.remove("d-none");
            success.classList.add("d-block");
            window.location = "products.html"
            
    }


});


// ---------------------------------------------------------- VALIDACION CAMPOS DE DATOS 

let botonDatos = document.getElementById("botonDatitos");
botonDatos.addEventListener("click", function (e) {


    let validar = true;

    if (street.value.trim() === "") {
        validar = false;
        street.classList.add("is-invalid");
        failure.classList.remove("d-none");
        failure.classList.add("d-block");
    }

    if (doorNumber.value.trim() === "") {
        validar = false;
        doorNumber.classList.add("is-invalid");
        failure.classList.remove("d-none");
        failure.classList.add("d-block");
    }

    if (corner.value.trim() === "") {
        validar = false;
        corner.classList.add("is-invalid");
        failure.classList.remove("d-none");
        failure.classList.add("d-block");
    }

    if (country.value.trim() === "") {
        validar = false;
        country.classList.add("is-invalid");
        failure.classList.remove("d-none");
        failure.classList.add("d-block");
    } if
        (validar) {
            failure.classList.remove("d-block");
            failure.classList.add("d-none");
            
            
    }


});





document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {

        if (resultObj.status === "ok") {

            carrito = resultObj.data.articles;

            showArticles(carrito);


        }
        costoEnvio();

        metodoPago();
    });

    street.addEventListener("input", function (e) {
        street.classList.remove("is-invalid");
        street.classList.add("is-valid");
    });

    doorNumber.addEventListener("input", function (e) {
        doorNumber.classList.remove("is-invalid");
        doorNumber.classList.add("is-valid");
    });

    corner.addEventListener("input", function (e) {
        corner.classList.remove("is-invalid");
        corner.classList.add("is-valid");
    });

    country.addEventListener("input", function (e) {
        country.classList.remove("is-invalid");
        country.classList.add("is-valid");
    });

    document.getElementById("nombre").addEventListener("input", function (e) {
        nom.classList.remove("is-invalid");
        nom.classList.add("is-valid");
    });

    cardNumber.addEventListener("input", function (e) {
        cardNumber.classList.remove("is-invalid");
        cardNumber.classList.add("is-valid");
    });

    code.addEventListener("input", function (e) {
        code.classList.remove("is-invalid");
        code.classList.add("is-valid");
    });

    bankNumber.addEventListener("input", function (e) {
        bankNumber.classList.remove("is-invalid");
        bankNumber.classList.add("is-valid");
    });


});