"use strict";

const results=document.getElementById("results");
const search=document.getElementById("search-input");
let data;

//API request
fetch("https://jsonplaceholder.typicode.com/users")
.then((resp)=>resp.json())
.then((responseData)=>{
    data=responseData;
    showClients(data);
});


//show clients function
function showClients(data){
    data.forEach(item => {
        const element=document.createElement("p");
        element.innerHTML=`ID:<b>${item.id}</b> - Nombre: <b>${item.name}</b> - 
        Usuario: <b>${item.username}</b> - Email: <b>${item.email}</b> - Empresa: <b>${item.company.name}</b>`;
        results.appendChild(element);
    });
}

//search clients function
function searchClients() {
    search.addEventListener("input", (e) => {
    cleanHTML();
    const inputText = e.target.value.toUpperCase().trim();
    const showFiltered = data.filter((item) => {
        return (
        item.id.toString().startsWith(inputText) ||
        item.name.toUpperCase().startsWith(inputText) ||
        item.username.toUpperCase().startsWith(inputText) ||
        item.email.toUpperCase().startsWith(inputText) ||
        item.company.name.toUpperCase().startsWith(inputText)
        );
    });
        if(showFiltered.length){
            showClients(showFiltered);
        }else{
            noResults();
        }
    });  
}

//clean HTML
function cleanHTML(){
    while(results.firstChild){
        results.removeChild(results.firstChild)
    }
}
 //No results
function noResults(){
    const noResult=document.createElement("div");
    noResult.textContent="no hay resultados de busqueda";
    results.appendChild(noResult);
}

searchClients();