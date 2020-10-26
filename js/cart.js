

var carrito = [];

function totalCost (){
    let total = 0 ;
    let cantidadSub = document.getElementsByClassName("total");
    for (let i=0; i < cantidadSub.length; i++) {
        total += parseInt(cantidadSub[i].innerHTML);
    }

    document.getElementById("sumaTot").innerHTML = total;
}

function subCost (unitCost, i){
    let count =  parseInt(document.getElementById(`cantidad${i}`).value);
    subTot = unitCost * count;
    document.getElementById(`sumaSub${i}`).innerHTML = subTot;

    totalCost ();

}

function unicaMoneda(unitCost, currency){
    if (currency === "UYU"){
        return unitCost / 40;
    } else 
    return unitCost
}

function showArticles (atributos){
    let content = "";

    for (let i=0; i<atributos.length; i++){

        let  articles = atributos[i];

        let costoDolar = unicaMoneda(articles.unitCost, articles.currency);
        let subT = costoDolar * articles.count;

        content +=
        `
        <div class="container">
        <table id="tabla">
        <tr style="width:60px;">
        <td id="entrada1"><div class="container"><img src='${articles.src}' width="150px"></div></td>

        <td id="entrada2"><strong>${articles.name}</strong></td>       
        <td id="entrada">${articles.unitCost}${articles.currency}</td> 

        <td id="entrada3" style="text-align: center;"><input style="width:60px;" onchange="subCost(${costoDolar}, ${i})" 
        type="number" id="cantidad${i}" value="${articles.count}" min="1"></td>

        <td id="entrada4" style="text-align: center;">Subtotal:<br><span id="sumaSub${i}" class="total" style="font-weight:bold;">${subT}</span>USD</td>

        </tr>
        `
        document.getElementById("lista").innerHTML = content;
    }

    totalCost ();

}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj){

        if (resultObj.status === "ok") {

            carrito = resultObj.data.articles ;

            showArticles(carrito);

        }
    });

});