  
// Elementos
  const inputName = document.getElementById('name');
  const inputId = document.getElementById('id');
  
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadBtn = document.getElementById('downloadBtn');
  const modal = document.getElementById('modal');
  let primerNombre = '';
  const p = 20;

  //Local
  // const URLbase ="http://192.168.1.15:5500/Frontend/ingreso/ingreso.html?id="; //Desarrollo
  //Proyecto pruebaa
  // const URLbase ="https://invitadosgalamcim2025.netlify.app/ingreso/ingreso.html?id=";
  //Real
  const URLbase ="https://invitacionesmcim.github.io/AcciondegraciasMCIM2025/ingreso/ingreso.html?id=";
  


   function cif(texto, clave) {
      const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const largo = alfabeto.length;
      let resultado = "";

      for (let i = 0; i < texto.length; i++) {
        const char = texto[i];
        const index = alfabeto.indexOf(char);

        // si el carácter existe en nuestro alfabeto
        if (index !== -1) {
          const nuevoIndex = (index + clave) % largo;
          resultado += alfabeto[nuevoIndex];
        } else {
          // si no está en el alfabeto, dejarlo igual
          resultado += char;
        }
      }

      return resultado;
  }



  //Pruebas
  // const URLApp= 'https://script.google.com/macros/s/AKfycbysppGcvXfwGPSgmFTz02tIb3WeQFj6_6Lnhj76ODalm3WVSvvdiwzhggOOjQ2padvTyA/exec';
  //REAL
  const URLApp= 'https://script.google.com/macros/s/AKfycbzUZLug25QLqJofzZvEyZMhnZ0X_eI-fh-S8loUVV4Q3EongqCXKd5BXM0HUgNsPIlOVQ/exec';
  
  
  const modalContent = document.getElementById("modal-content");
const modalNoRegistrado = document.getElementById("modal-noregistrado");
const modalVerificando = document.getElementById("modal-verificando");
const modo = "consulta";
const lugar= "casa";

async function Ingresar(texto) {
      const url = URLApp + "?texto=" + encodeURIComponent(texto) + "&modo=" + encodeURIComponent(modo)+"&lugar=" + encodeURIComponent(lugar);
  const res = await fetch(url);
  const data = await res.json();
   
  if (data.encontrado) {
    console.log("Texto encontrado en la fila:", data.fila);
      modalContent.style.display = "flex";
      modalNoRegistrado.style.display = "none";

  } else {
      modalContent.style.display = "none";
      modalNoRegistrado.style.display = "flex";
  }

  modalVerificando.style.display = "none";
}







  // Mantener instancia para poder regenerar
  let qr = null;

  // Genera el QR en qrcodeContainer
  function generarQR() {
    const text = inputId.value.replace(/[ .,]/g, "") || '';
    const size = 120;
    const ecLevel = 'H'; // L, M, Q, H
    
    if (text.length === 0) {
      return;
    }


    Ingresar(text);

    downloadBtn.disabled = true;

    // Limpiar contenedor
    qrcodeContainer.innerHTML = '';


    const gracias = document.getElementById('modal-gracias');
    primerNombre = inputName.value.trim().split(/\s+/)[0];
    gracias.textContent = `¡Gracias por confirmar tu asistencia, ${primerNombre}!`;


    const newtext = cif(text, p);

    // Opciones para la librería (usa el constructor QRCode)
    const options = {
      text:URLbase + newtext + "&nombre=" + primerNombre,
      width: size,
      height: size,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel[ecLevel] // QRCode.CorrectLevel.M por ejemplo
    };

    // Si el usuario quiere <img> en vez de canvas, usaremos renderer "table" o crearemos un img desde canvas.
    // La librería crea por defecto un <canvas> en navegadores modernos.
    qr = new QRCode(qrcodeContainer, options);
  

    // Mostrar modal
    modal.style.display = 'flex';

    // Pequeña espera para que el canvas/img se cree antes de permitir descargar
    setTimeout(() => {
      downloadBtn.disabled = false;
    }, 100);
  }

  // Descarga el QR como PNG desde el canvas
  function descargarPNG() {
    downloadBtn.style.display = 'none';
    
    html2canvas(modal).then(canvas => {
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "Ticket-"+ primerNombre + ".png";
      link.click();
    });
    
    downloadBtn.style.display = 'flex';
  }


  function descargarDesdeURL(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }


    downloadBtn.addEventListener('click', descargarPNG);

  function cerrarModal() {
    modal.style.display = 'none';
    modalContent.style.display = "none";
    modalNoRegistrado.style.display = "none";
      modalVerificando.style.display = "flex";
  }
