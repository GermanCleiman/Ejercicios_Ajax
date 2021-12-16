// Funcion anonina autoejecutada
(()=>{
const xhr = new XMLHttpRequest(),//1º paos creo una instancia
  $xhr = document.getElementById("xhr"),
  $fragment = document.createDocumentFragment();//crea unn fragmento de documento HTML
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
//  xhr.onreadystatechange = ó //este metodo trae los valores de todos los anteriores a el , mirar en console
  xhr.addEventListener("readystatechange", (e)=>{
    //console.log(xhr)

    //El codigo que sigue solo se ejecuta despues de terminar el pedido
    if(xhr.readyState !==4)return;
    console.log(xhr);//lee los 4 estados de readyState, el 0 no

    if(xhr.status >= 200 && xhr.status <=300){
      console.log("exito");
      console.log(xhr.responseText);
      let json = JSON.parse(xhr.responseText);//parse transforma el formato texto a  json
      console.log(json);

      json.forEach((el)=>{
        const $li = document.createElement("li"),
        $br = document.createElement("br");
        $li.innerHTML = `${el.name} -- ${el.email} -- ${el.phone}`;
        $fragment.appendChild($li);
        $fragment.appendChild($br);
        //aqui puedo poner un louder
      })

      $xhr.appendChild($fragment);

    } else {
      console.log("error");
      //Probar modificando ed HTTP
      let message = xhr.statusText || "Ocurrió un error";
      $xhr.innerHTML = `Error ${xhr.status}: ${message}`;

    }

})
    //3º paso abro comunicacion , 1º parametro tipo de comunicacion 2º su URL
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    // xhr.open("GET", "../assets/users.json");
    //4º paso envio de peticion
    xhr.send();//vacio solo read

})();
