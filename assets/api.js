
const urlEpisodio = "https://rickandmortyapi.com/api/episode/";
const urlLugar = "https://rickandmortyapi.com/api/location/";



/* const searchPersonaje = async ()  =>{
try {
    const llamado = await fetch (urlPersonaje);
    const data =  await llamado.json();
    return data
    
    
} catch (error) {
    console.log("error de comunicacion con el servidor")
}

} */

const searchEpisodio = async (episodio)  =>{
try {
    const llamado = await fetch (urlEpisodio+episodio);
    const data =  await llamado.json();
    return data
    
} catch (error) {
    console.log("error de comunicacion con el servidor")
}

}

const searchUbicacion = async (ubicacion)  =>{
try {
    const llamado = await fetch (urlLugar+ubicacion);
    const data =  await llamado.json();
    return data
    
} catch (error) {
    console.log("error de comunicacion con el servidor")
}

}