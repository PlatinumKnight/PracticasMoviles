function Leer() {
  const peli = document.getElementById("input").value;
  const sp = "es";
  //   const ciudad = "Tijuana";
  //obtain an apikey on this web
  //http://www.omdbapi.com/apikey.aspx
  const key = "a0e8c66d8f4f530b6af7181097f0fce3";
  const api_url = `http://api.openweathermap.org/data/2.5/weather?q=${peli}&appid=${key}&lang=${sp}&units=metric`;
  //   console.log(api_url);
  buscar2(api_url);
}

const buscar2 = async (api_url) => {
  const data = await fetch(api_url);
  const respuesta = await data.json();
  const { name, id, coord, main } = respuesta;
  const Search = await respuesta.weather;

  if (Search != null) {
    document.getElementById("lista").innerHTML = "";
    Search.map(({ description, icon }) => {
      document.getElementById(
        "lista"
      ).innerHTML += `<div style="margin-top:10px;">
                    <h1>Ciudad:${name} </h1>
                    <h1>ID:${id} </h1>
                    <h1>Clima:${description}</h1>
                    <h1>Temperatura min:${main.temp_min}</h1>
                    <h1>Temperatura max:${main.temp_max}</h1>
                    <h1>Coordenadas:${coord.lon},${coord.lat}</h1>
                    <img style="width:7rem; display: block; margin: 0 auto;" src='http://openweathermap.org/img/wn/${icon}.png'/>

                    </div>`;
    });
  }
};
