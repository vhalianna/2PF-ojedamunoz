// Array para almacenar los certificados
let certificados = [];
let certificadoCargado = false;

// Clase Persona para representar a una persona con apellido, nombre y DNI
function Persona(apellido, nombre, dni) {
  this.apellido = apellido;
  this.nombre = nombre;
  this.dni = dni;
}

// Referencias a los elementos del DOM
const apellidoInput = document.getElementById("apellido");
const nombreInput = document.getElementById("nombre");
const dniInput = document.getElementById("dni");
const tipoCertificadoInput = document.getElementById("tipoCertificado");
const cargarCertificadoBtn = document.getElementById("btnCargarCertificado");
const informeBtn = document.getElementById("btnInforme");
const resultadoElement = document.getElementById("resultado");
const certificadosContainer = document.getElementById("certificadosContainer");
const cantidadCertificadosContainer = document.getElementById("cantidadCertificadosContainer");

// Cargar certificados almacenados en el almacenamiento local al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
  const storedCertificados = localStorage.getItem("certificados");
  if (storedCertificados) {
    certificados = JSON.parse(storedCertificados);
    mostrarCertificados();
  }
});

// Agregar eventos de clic para los botones
cargarCertificadoBtn.addEventListener("click", validarCarga);
informeBtn.addEventListener("click", informe);

// Función para validar y cargar un certificado al hacer clic en el botón "Cargar Certificado
function validarCarga() {
  const apellido = apellidoInput.value;
  const nombre = nombreInput.value;
  const dni = dniInput.value;
  const tipoCertificado = tipoCertificadoInput.value;

  // Validar que se hayan ingresado todos los campos
  if (!apellido || !nombre || !dni || !tipoCertificado) {
    resultadoElement.textContent = "Por favor, complete todos los campos antes de cargar el certificado.";
    return;
  }
  // Validar que el DNI tenga exactamente 8 cifras numéricas
  if (dni.length !== 8 || !/^[0-9]+$/.test(dni)) {
    resultadoElement.textContent = "El DNI debe contener 8 cifras numéricas.";
    return;
  }
  // Validar que el nombre y apellido contengan solo letras
  if (!/^[A-Za-z]+$/.test(apellido) || !/^[A-Za-z]+$/.test(nombre)) {
    resultadoElement.textContent = "El nombre y el apellido deben contener solo letras.";
    return;
  }
  // Crear una instancia de la clase Persona con los datos ingresados
  const persona = new Persona(apellido, nombre, dni);
  // Cargar el certificado en el array
  cargarCertificado(tipoCertificado, persona);
  // Limpiar los campos de entrada
  apellidoInput.value = "";
  nombreInput.value = "";
  dniInput.value = "";
  tipoCertificadoInput.selectedIndex = 0; // Restablecer la selección al primer índice (opción predeterminada)
  mostrarCertificados();
}

function cargarCertificado(tipo, persona) {
  persona.apellido = formatearCadena(persona.apellido);
  persona.nombre = formatearCadena(persona.nombre);
  tipo = formatearCadena(tipo);
  // Agregar el certificado al array de certificados
  certificados.push({ tipo: tipo, persona: persona });

  // Guardar los certificados en el almacenamiento local
  localStorage.setItem("certificados", JSON.stringify(certificados));
 // Mostrar el alerta
 mostrarSuccessAlert();
}

// Función para mostrar el alerta de éxito
function mostrarSuccessAlert() {
  const successAlert = document.getElementById("successAlert");
  successAlert.style.display = "block";

}

function contarCertificadosPorTipo() {
  const conteo = {};
  
  certificados.forEach((certificado) => {
    const tipo = certificado.tipo;
    if (conteo[tipo]) {
      conteo[tipo]++;
    } else {
      conteo[tipo] = 1;
    }
  });
  
  return conteo;
}

// Función para contar la cantidad de certificados cargados
function informe() {
  const conteo = contarCertificadosPorTipo();
  let conteoHTML = "<h3>Certificados por Tipo:</h3><ul>";
  
  for (const tipo in conteo) {
    conteoHTML += `<li>${tipo}: ${conteo[tipo]}</li>`;
  }
  conteoHTML += "</ul>";
  const cantidadCertificados = certificados.length;
  // Agrega el conteo por tipo y la cantidad total al contenedor
  cantidadCertificadosContainer.innerHTML = conteoHTML + `<p>Cantidad de certificados cargados: ${cantidadCertificados}</p>`;
}

function mostrarCertificados() {
 // Lógica para mostrar los certificados en una tabla de Bootstrap
 const certificadosContainer = document.getElementById("certificadosContainer");
 // Limpia el contenido existente en el contenedor
 certificadosContainer.innerHTML = "";
 if (certificados.length === 0) {
  certificadosContainer.textContent = "No hay certificados cargados.";
  } else {
  // Crear una tabla de Bootstrap con la clase "table" y "table-hover"
  const table = document.createElement("table");
  table.classList.add("table", "table-hover"); // Agregar las clases de Bootstrap
  // Crear el encabezado de la tabla
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = ["#", "Tipo", "Apellido", "Nombre", "DNI"];
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
    });
  
  thead.appendChild(headerRow);
  // Crear el cuerpo de la tabla
  const tbody = document.createElement("tbody");
  // Recorre los certificados y agrega filas a la tabla
  certificados.forEach((certificado, index) => {
    const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${certificado.persona.apellido}</td>
            <td>${certificado.persona.nombre}</td>
            <td>${certificado.persona.dni}</td>
            <td>${certificado.tipo}</td>
        `;
        tbody.appendChild(newRow);
    });
  
  table.appendChild(thead);
  table.appendChild(tbody);
  certificadosContainer.appendChild(table);
  }
}
  
function formatearCadena(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
  