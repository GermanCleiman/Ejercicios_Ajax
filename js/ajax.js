// Funcion anonina autoejecutada con "XMLHttpRequest()"
(() => {
  const xhr = new XMLHttpRequest(), //1º paos creo una instancia
    $xhr = document.getElementById("xhr"),
    $fragment = document.createDocumentFragment(); //crea unn fragmento de documento HTML
  //para hacer solo una insercion en el DOM

  //console.log(xhr)
  /*
  readyState: 0 uninitialized
  readyState: 1 loading
  readyState: 2 loaded
  readyState: 3 interactive
  readyState: 4 complete
  */

  // 2º paso asignacion de evento
  //  xhr.onreadystatechange = ó //este metodo trae los valores de todos los anteriores a el ,
  // mirar en console
  xhr.addEventListener("readystatechange", (e) => {
    //console.log(xhr)

    //El codigo que sigue solo se ejecuta despues de terminar el pedido
    if (xhr.readyState !== 4) return;
    console.log(xhr); //lee los 4 estados de readyState, el 0 no

    if (xhr.status >= 200 && xhr.status <= 300) {
      console.log("exito");
      console.log(xhr.responseText);
      //La respuesta viene en formato de texto
      let json = JSON.parse(xhr.responseText); //parse transforma el formato texto a  json
      console.log(json);

      json.forEach((el) => {
        const $li = document.createElement("li"),
          $br = document.createElement("br");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
        $fragment.appendChild($br);
        //aqui puedo poner un louder
      });

      $xhr.appendChild($fragment);
    } else {
      console.log("error");
      //Probar modificando ed HTTP
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
    }
  });
  //3º paso abro comunicacion , 1º parametro tipo de comunicacion 2º su URL
  xhr.open("GET", "https://jsonplaceholder.typicode.com/users"); // por http
  // xhr.open("GET", "../assets/users.json");//por archivo propio json
  //4º paso envio de peticion
  xhr.send(); //vacio solo read
})();

//----------- Funcion anonina autoejecutada con "API Fetch" ------------------

(() => {
  const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();
  /*Fetch(URL, method por defaulte GET).then().catch().finally(); , trabaja con promesas */
  fetch("https://jsonplaceholder.typicode.com/users") // tambien lo puedo hacer con "../assets/users.json"
    // La respuesta viene en formato ReadableStream, hay que transformarlo a
    // json ó a text ó blob(para imagenets datauri), ver documentacion fetch MDN
    // .then((res) => {
    //   console.log(res);
    //   return res.ok ? res.json() : Promise.reject(res);
    // })
    /* Si res en su parametro ok es true ? res a jason : false llamo a la promise y rechazo (res)
    asi se valida un error para que se ejecute el catch*/
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    // cuando la arrow function es de una sola linea el return es por default
    .then((json) => {
      console.log(json);
      // $fetch.innerHTML = json;
      json.forEach((el) => {
        const $li = document.createElement("li"),
          $br = document.createElement("br");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
        $fragment.appendChild($br);
        //aqui puedo poner un louder
      });

      $fetch.appendChild($fragment);
    })
    .catch((err) => {
      console.log("Estoy en el catch", err);
      let message = err.statusText || "Ocurrió un error";
      $fetch.innerHTML = `Error ${err.status}: ${message}`;
    })
    .finally(() =>
      console.log(
        "Esto se ejecutará independientemente del resultado de la Promesa Fetch"
      )
    );
})();

//----------- Funcion anonina autoejecutada con "API Fetch con funciones asyncronas" ------------------

(() => {
  const $fetchAsync = document.getElementById("fetch-async"),
    $fragment = document.createDocumentFragment();

  async function getData() {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users"),
        // tambien lo puedo hacer con "../assets/users.json"
        json = await res.json();
      //console.log(res, json);

      if (!res.ok) {
        //throw new Error("Ocurrrio un Error al solicitar los datos");
        // Lanzo un nuevo error(solo envio de texto) para el catch
        throw { status: res.status, statusText: res.statusText };
      }

      json.forEach((el) => {
        const $li = document.createElement("li"),
          $br = document.createElement("br");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
        $fragment.appendChild($br);
        //aqui puedo poner un louder
      });

      $fetchAsync.appendChild($fragment);
    } catch (err) {
      console.log("Estoy en el catch", err);
      let message = err.statusText || "Ocurrió un error";
      $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;
    } finally {
      console.log(
        "Esto se ejecutará independientemente del resultado de la Promesa Fetch"
      );
    }
  }

  getData();
})();
