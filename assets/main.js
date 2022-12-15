//console.log(searchPersonaje());

let personajes =[] ;

const traerPersonajes = async (name) =>{
personajes= await searchPersonaje();
personajes.map((personaje)=>personaje)

}
traerPersonajes();


