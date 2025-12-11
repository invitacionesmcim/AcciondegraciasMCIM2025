  
// Elementos
  const inputName = document.getElementById('name');
  const inputId = document.getElementById('id');
  
  const qrcodeContainer = document.getElementById('qrcode');
  const downloadBtn = document.getElementById('downloadBtn');
  const modal = document.getElementById('modal');
  const info = document.getElementById('info');
  const p = 20;

  // const URLbase ="http://192.168.1.15:5500/Frontend/ingreso.html?id="; //Desarrollo
  const URLbase ="https://invitadosgalamcim2025.netlify.app/frontend/ingreso.html?id=";

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



  // Mantener instancia para poder regenerar
  let qr = null;

  // Genera el QR en qrcodeContainer
  function generarQR() {
    const text = inputId.value.replace(/[ .,]/g, "") || '';
    const size = 250;
    const ecLevel = 'H'; // L, M, Q, H
    

    // Limpiar contenedor
    qrcodeContainer.innerHTML = '';


    const gracias = document.getElementById('modal-gracias');
    const primerNombre = inputName.value.trim().split(/\s+/)[0];
    gracias.textContent = `¡Gracias por confirmar tu asistencia, ${primerNombre}!`;

    if (!text.trim()) {
      info.textContent = 'Introduce texto para generar el QR.';
      return;
    }

    info.textContent = 'Generando...';


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
      info.textContent = 'QR generado. Puedes descargarlo como PNG.';
    }, 100);
  }

  // Descarga el QR como PNG desde el canvas
  function descargarPNG() {
    html2canvas(modal).then(canvas => {
      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "captura.png";
      link.click();
    });
    
  }


  function saveScreenAsImage() {
html2canvas(document.body).then(canvas => {
  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = image;
  link.download = "captura.png";
  link.click();
});
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
