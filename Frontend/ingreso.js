const URLApp= 'https://script.google.com/macros/s/AKfycbwob0FufTBBlvYzicMAfD2qHIUJ2fkFuk38flc8U6uFva4IweYrw1iqSAxUT63p2S16zw/exec'

const params = new URLSearchParams(window.location.search);
const idPersona = params.get("id");
const nombrePersona = params.get("nombre");
console.log(idPersona); // "ABC123"
const SI = document.getElementById("si");
const NO = document.getElementById("no");
const Veri = document.getElementById("veri");
  const p = 20;

async function buscarTexto(texto) {
  const url = URLApp + "?texto=" + encodeURIComponent(texto);
  const res = await fetch(url);
  const data = await res.json();
  return data;
}



buscarTexto(des(idPersona,p)).then(res => {
  if (res.encontrado) {
    console.log("Texto encontrado en la fila:", res.fila);
      SI.style.display = "flex";
      NO.style.display = "none";
      Veri.style.display = "none";
      SI.innerHTML= "Bienvenid@ " + nombrePersona + "<br> ✅";


  } else {
      SI.style.display = "none";
      NO.style.display = "flex";
      Veri.style.display = "none";
      NO.innerHTML= "Su Id no se encuentra en la lista."+ "<br> ❌";

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