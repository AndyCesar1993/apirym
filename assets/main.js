const urlPersonaje = "https://rickandmortyapi.com/api/character/";
const form = document.querySelector(".form");
const inputPersonaje = document.querySelector(".buscar-personaje");
const renderHtml = document.querySelector(".render-html");
const error = document.querySelector(".error");
const renderPaginas = document.querySelector(".paginas-numero");

let nextPag = "";
let prevPag = "";

let personajes=JSON.parse(localStorage.getItem("cards")) ||[];
const saveLocalStorage = (personaje)=>{
  localStorage.setItem("cards",JSON.stringify(personaje));
}

const renderError= mensaje =>{
  error.style.display="flex";
  error.textContent=mensaje;
}

const clearError=()=>{
  error.textContent="";
  error.style.display="none";
}

const traductor = palabra =>{
  switch(palabra){
    case "Human":
      return "Humano";
    case "Alien":
      return "Alienigena";
    case "Alive":
      return "Vivo";
    case "Dead":
      return "Muerto";
    case "Male":
      return "Masculino";
    case "Female":
      return "Femenina";
    case "Earth (C-137)":
      return "Tierra (C-137)";
    case "Earth (Replacement Dimension)":
      return "Tierra (Dimensión de Reemplazo)";
    case "Abadango":
      return "Abadango";
    case "unknown":
      return "Desconocido"
  }
}


const renderCardPersonaje = ({id,name,image,gender,status,species,origin}) => {
  return `<div class="card-personaje">
             <i class="bi bi-x-circle close" data-id="${id}"></i>
             <h2>${name}</h2>
             <img src="${image}" alt="img personaje">
             <div class="datos">
               <h3>Especie: <small>${traductor(species)}</small></h3>
               <h3>Estatus: <small>${traductor(status)}</small></h3>
               <h3>Genero: <small>${traductor(gender)}</small></h3>
               <h3>Origen: <small>${traductor(origin.name)}</small></h3>
             </div>
          </div>`;
}

const renderToHtml= (personaje) =>{
  const rendersCards = personaje.map((pj)=> renderCardPersonaje(pj));
  renderHtml.innerHTML = rendersCards;
}

const sacarCard =(e)=>{
  
  if (!e.target.classList.contains("close")){
    return;}
  const pjSelec=e.target.dataset.id;  
  if (true) {
    personajes= personajes.filter((pj)=>pj.id !== Number(pjSelec));
  }
  renderToHtml(personajes);
  saveLocalStorage(personajes);
};

const searchPersonaje = async (e) => {
  
  e.preventDefault();
  const inputValue = inputPersonaje.value.toLowerCase();
  const llamado = await fetch(urlPersonaje);
  const json = await llamado.json();
  const data = json.results;

  nextPag = await json.info.next;
  prevPag = await json.info.prev;
  
  renderPaginas.textContent = `${json.info.prev+1} de ${json.info.pages}`;

  const personaje = data.find((personaje) => personaje.name.toLowerCase() === inputValue);

  if(inputValue==="personajes"){
    personajes=data;
    renderToHtml(personajes);  
    saveLocalStorage(personajes);
    clearError();
    return;
  }else if (!inputValue) {
    form.reset();
    renderError("El campo es Obligatorio!");
    return;
  }else if(!personaje){
    form.reset();
    renderError("No se encontro el Personaje!");
    return;
  }else if(personajes.some((pj)=>pj.name === personaje.name)){
    form.reset();
    renderError("Ya se esta mostrando el Personaje!");
    return;
  }else {
    clearError();
    personajes=[...personajes,personaje];
    renderToHtml(personajes);  
    saveLocalStorage(personajes);
  }
  form.reset();

  
};

const cambiarPag = async(e)=>{
if (!e.target.classList.contains("anterior")&&!e.target.classList.contains("posterior")) {
  console.log("afuera")
  return;}
 if (e.target.classList.contains("anterior")){
  console.log("anterior")
  const llamado = await fetch(prevPag);
  const json = await llamado.json();
  const data = json.results;
  personajes = data;
  renderToHtml(personajes);
  saveLocalStorage(personajes);
  nextPag = await json.info.next;
  prevPag = await json.info.prev;
  renderPaginas.textContent = `${json.info.prev+1} de ${json.info.pages}`;
}if(e.target.classList.contains("posterior")){
  console.log("posterior")
  const llamado = await fetch(nextPag);
  const json = await llamado.json();
  const data = json.results;
  personajes = data;
  renderToHtml(personajes);
  saveLocalStorage(personajes);
  nextPag = await json.info.next;
  prevPag = await json.info.prev;  
  renderPaginas.textContent = `${json.info.prev+1} de ${json.info.pages}`;

}
}



const init = () =>{
  form.addEventListener("submit",searchPersonaje);
  window.addEventListener("click",sacarCard);
  window.addEventListener("click",cambiarPag);
  renderToHtml(personajes);
}
init();