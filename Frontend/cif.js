export function cif(texto, clave) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    // se recorre cada carácter y se desplaza usando la clave
    const codigo = texto.charCodeAt(i) + clave;
    resultado += String.fromCharCode(codigo);
  }
  return resultado;
}

export function des(texto, clave) {
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    const codigo = texto.charCodeAt(i) - clave;
    resultado += String.fromCharCode(codigo);
  }
  return resultado;
}
