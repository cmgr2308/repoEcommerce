//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            // Muestro categorías ordenadamente 
            showProductsList(categoriesArray);
        }


    });
    document.getElementById("quitar").addEventListener("click", function () {

        document.getElementById("min").value = "";
        document.getElementById("max").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList(categoriesArray);
    });

});

var minPrice = undefined;
var maxPrice = undefined;

var buscar = undefined;

var categoriesArray = [];

function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minPrice == undefined) || (minPrice != undefined & parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined & parseInt(product.cost) <= maxPrice))) {

            if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1) {

                htmlContentToAppend += `
          <a href="product-info.html" class="list-group-item list-group-item-action">
              <div class="row">
                  <div class="col-3">
                      <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                  </div>
                  <div class="col">
                      <div class="d-flex w-100 justify-content-between">
                          <h4 class="mb-1">`+ product.name + ` - USD ` + product.cost + `</h4>
                          <small class="text-muted">` + ` ` + product.soldCount + ` vendidos  </small>
                      </div>
                      <p class="mb-1">` + product.description + `</p>
                  </div>
              </div>
          </a>
          `
                document.getElementById("listaProductos").innerHTML = htmlContentToAppend;
            }
        }
    }
}


function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        categoriesArray = categoriesArray;
    }

    categoriesArray = sortProducts(currentSortCriteria, categoriesArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

const ORDER_ASC_BY_PRICE = "PRECIO>precio"
const ORDER_DESC_BY_PRICE = "precio<PRECIO"
const ORDER_DESC_BY_REL = "rel<REL"


function sortProducts(criterio, array) {
    let result = [];

    if (criterio === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;

        });
    } else if (criterio === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criterio === ORDER_DESC_BY_REL) {
        result = array.sort(function (a, b) {
            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
        return result;
    }
}

//eventlistener sort
document.getElementById("sortPriceDesc").addEventListener("click", function () {
    productsArray = sortProducts(ORDER_DESC_BY_PRICE, categoriesArray);

    showProductsList(categoriesArray);
});

document.getElementById("sortPriceAsc").addEventListener("click", function () {
    productsArray = sortProducts(ORDER_ASC_BY_PRICE, categoriesArray);

    showProductsList(categoriesArray);
});

document.getElementById("sortRelDesc").addEventListener("click", function () {
    productsArray = sortProducts(ORDER_DESC_BY_REL, categoriesArray);

    showProductsList(categoriesArray);
});


//eventlistener filtros
document.getElementById("filtro").addEventListener("click", function () {

    minPrice = document.getElementById("min").value
    maxPrice = document.getElementById("max").value

    if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
        minPrice = parseInt(minPrice);
    } else {
        minPrice = undefined;
    }

    if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
        maxPrice = parseInt(maxPrice);
    } else {
        maxPrice = undefined;
    }

    showProductsList(categoriesArray);
});

//evento input para el buscador

document.getElementById("search").addEventListener("input", function() {
    buscar = document.getElementById("search").value.toLowerCase();

    showProductsList(categoriesArray);
});

document.getElementById("limpiaSearch").addEventListener("click", function() {
    document.getElementById("search").value = "";

    buscar = undefined;

    showProductsList(categoriesArray);
});



