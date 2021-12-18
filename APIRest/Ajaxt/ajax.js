const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const ajax = (options) => {
  let { url, method, success, error, data } = options; //destructurado
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;

    if (xhr.status >= 200 && xhr.status <= 300) {
      let json = JSON.parse(xhr.responseText); //paso de texto plano a objeto
      success(json);
    } else {
      let message = xhr.statusText || "Ocurrió un error";
      error(`Error ${xhr.status}: ${message}`);
    }
  });
  xhr.open(method || "GET", url);
  // para enviar(POST) debe tener header y body
  xhr.setRequestHeader("Content-type", "application/json; charset= utf-8");
  //para enviar paso el json a cadena de texto
  xhr.send(JSON.stringify(data));
};

const getAll = () => {
  ajax({
    //method: "GET",//No lo necesita
    url: "http://localhost:3000/santos",
    success: (res) => {
      console.log(res);
      res.forEach((el) => {
        $template.querySelector(".name").textContent = el.nombre;
        $template.querySelector(".constellation").textContent = el.constelacion;
        // en la clase edit del boton del template, le agrego 3 dataset que guarden ...
        $template.querySelector(".edit").dataset.id = el.id;
        $template.querySelector(".edit").dataset.name = el.nombre;
        $template.querySelector(".edit").dataset.constellation =
          el.constelacion;
        //para delete solo el id
        $template.querySelector(".delete").dataset.id = el.id;
        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });

      $table.querySelector("tbody").appendChild($fragment);
    },
    error: (err) => {
      console.log(err);
      console.log($table);

      $table.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    },
    //data: null,//No lo necesita
  });
};

d.addEventListener("DOMContentLoaded", getAll);
