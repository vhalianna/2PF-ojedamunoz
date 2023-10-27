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

// Función para validar y cargar un certificado al hacer clic en el botón "Cargar Certificado"
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

  // Crear una instancia de la clase Persona con los datos ingresados
  const persona = new Persona(apellido, nombre, dni);

  // Cargar el certificado en el array
  cargarCertificado(tipoCertificado, persona);
  
  // Establecer certificadoCargado en true cuando se carga un certificado
  certificadoCargado = true;

  // Limpiar los campos de entrada
  apellidoInput.value = "";
  nombreInput.value = "";
  dniInput.value = "";
  tipoCertificadoInput.selectedIndex = 0; // Restablecer la selección al primer índice (opción predeterminada)
  
  // Mostrar la alerta de éxito solo cuando se carga un certificado
  if (certificadoCargado) {
    const successAlert = document.getElementById("successAlert");
    successAlert.style.display = "block";
  }

  // Mostrar los certificados cargados
  mostrarCertificados();
}

function cargarCertificado(tipo, persona) {
  // Agregar el certificado al array de certificados
  certificados.push({ tipo: tipo, persona: persona });

  // Guardar los certificados en el almacenamiento local
  localStorage.setItem("certificados", JSON.stringify(certificados));
}

// Función para contar la cantidad de certificados cargados
function informe() {
  const cantidadCertificados = certificados.length;
  cantidadCertificadosContainer.textContent = `Cantidad de certificados cargados: ${cantidadCertificados}`;
}

function mostrarCertificados() {
  // Lógica para mostrar los certificados en la página
  const certificadosContainer = document.getElementById("certificadosContainer");

  // Limpia el contenido existente en el contenedor
  certificadosContainer.innerHTML = "";

  // Recorre los certificados y muestra cada uno
  certificados.forEach((certificado, index) => {
    const certificadoElement = document.createElement("div");
    certificadoElement.textContent = `Certificado ${index + 1}: ${certificado.tipo}, ${certificado.persona.apellido} ${certificado.persona.nombre}, DNI: ${certificado.persona.dni}`;
    certificadosContainer.appendChild(certificadoElement);
  });
}
