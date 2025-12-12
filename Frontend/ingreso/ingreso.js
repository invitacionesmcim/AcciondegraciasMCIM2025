const URLApp= 'https://script.google.com/macros/s/AKfycbwlyOfenm6w7ZX4YKQApeKSJmSrHMke9VRqFc0JPZTw8qaEAhsXrHBJ9_9vIjinkvS_6w/exec'

const params = new URLSearchParams(window.location.search);
const idPersona = params.get("id");
const nombrePersona = params.get("nombre");
console.log(idPersona); // "ABC123"
let SI = document.getElementById("si");
let NO = document.getElementById("no");
let Veri = document.getElementById("veri");
let Info = document.getElementById("info");
  const p = 20;

async function buscarTexto(texto) {

// const fechaObjetivo = new Date("2025-12-16T18:20:00"); // Fecha real
const fechaObjetivo = new Date("2025-11-16T18:20:00"); //Pruebas
const ahora = new Date();

  if (ahora < fechaObjetivo) {
      SI.style.display = "none";
      NO.style.display = "none";
      Veri.style.display = "none";
      Info.style.display = "flex";
  } else {
      const modo = "ingreso";
      const url = URLApp + "?texto=" + encodeURIComponent(texto, modo);
      const res = await fetch(url);
      const data = await res.json();
      return data;
  }

}



buscarTexto(des(idPersona,p)).then(res => {
  if (res.encontrado) {
    console.log("Texto encontrado en la fila:", res.fila);
      SI.style.display = "flex";
      NO.style.display = "none";
      Veri.style.display = "none";
      Info.style.display = "none";
      if(res.registrado){
        SI.innerHTML= "<p>Upss... <br> Parece que " + nombrePersona + " ya ingresó. <br> ❌ </p>";
      }
      else{
        SI.innerHTML= "<p> Bienvenid@ " + nombrePersona + "<br> ✅ </p>";
      }


  } else {
      SI.style.display = "none";
      NO.style.display = "flex";
      Veri.style.display = "none";
      NO.innerHTML= "<p> No se encuentra en la lista."+ "<br> ❌ </p>";
      Info.style.display = "none";

  }
});


 function des(texto, clave) {
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const largo = alfabeto.length;
    let resultado = "";

    for (let i = 0; i < texto.length; i++) {
      const char = texto[i];
      const index = alfabeto.indexOf(char);

      if (index !== -1) {
        const nuevoIndex = (index - clave + largo) % largo;
        resultado += alfabeto[nuevoIndex];
      } else {
        resultado += char;
      }
    }

    return resultado;
  }