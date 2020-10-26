//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var product = {};
var comentariosArray = [];
var arrayProductos = [];

function relatedProducts(productosArray, arrayRelated) {
    let related = '<hr>';

    arrayRelated.forEach(function (i) {
        related += '<a href="product-info.html"><button class="btn btn-light " "><strong>' + productosArray[i].name + '</strong></button><br>';
        
        related += ' <img height="150px"  src="' + productosArray[i].imgSrc + '">';
        
        related += '<br><hr><br>'

    });

    document.getElementById("img1").src = product.images[0];
    document.getElementById("img2").src = product.images[1];
    document.getElementById("img3").src = product.images[2];
    document.getElementById("img4").src = product.images[3];
    document.getElementById("img5").src = product.images[4];

    document.getElementById("relacionadosProductos").innerHTML = related;
}



function showComments(arrayComentarios) {
    let comments = "<hr>";

    arrayComentarios.forEach(function (comment) {

        let puntos = "";

        comments +=
            ` <strong> ${comment.user}</strong> dice: <br>
        <p>${comment.description}</p>`;

        for (let i = 1; i <= comment.score; i++) {
            puntos += `<span class="fa fa-star checked"></span>`;
        }

        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += `<span class="fa fa-star"></span>`;
        }

        comments += `<sub>${comment.dateTime}</sub><br>`;

        comments += `<div style="text-align: right;">${puntos}</div><br><hr><br>`;

    });

    


    document.getElementById("comentarios").innerHTML = comments;
}

function checkedStars() {
    let estrellitas = document.getElementsByName("rating");

    for (let i = 0; i <= estrellitas.length; i++) {
        if
            (estrellitas[i].checked) {
            return estrellitas[i].value
        }
    }
    
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {
            comentariosArray = resultObj.data;
        }

        showComments(comentariosArray);

    });



    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");



            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;

            


            //Muestro las imagenes en forma de galería
            
        }
    });

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            arrayProductos = resultObj.data;

            relatedProducts(arrayProductos, product.relatedProducts);
        }
    });
});

let contraUser = localStorage.getItem("User");
if (contraUser) {
    document.getElementById("nuevoComentario").style = "display:inline-block;";
}
//agregar que si el usuario esta logueado me muestre para comentar

document.getElementById("sendComment").addEventListener("click", function () {
    let fecha = new Date();

    let dateTime = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} `;
    dateTime += `${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    let newComment = {
        score: parseInt(checkedStars()),
        description: document.getElementById("newComent").value,
        user: JSON.parse(localStorage.getItem("User")).user,
        dateTime: dateTime
    };

    comentariosArray.push(newComment);
    showComments(comentariosArray);

});
