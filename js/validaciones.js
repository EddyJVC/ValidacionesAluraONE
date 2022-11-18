export const valida = (input) => {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeError(tipoDeInput, input);
  }
};

const tipoDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensajeDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede ser vacio",
  },
  email: {
    valueMissing: "El campo email no puede ser vacio",
    typeMismatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El campo contraseña no puede ser vacio",
    patternMismatch:
      "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo nacimiento no puede ser vacio",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "El campo numero no puede ser vacio",
    patternMismatch: "El formato requerido es de 10 numeros (XXXXXXXXXX)",
  },
  direccion: {
    valueMissing: "El campo direccion no puede ser vacio",
    patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo ciudad no puede ser vacio",
    patternMismatch: "La ciudad debe contener entre 4 a 30 caracteres",
  },
  provincia: {
    valueMissing: "El campo provincia no puede ser vacio",
    patternMismatch: "La provincia debe contener entre 4 a 30 caracteres",
  },
};

const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

const mostrarMensajeError = (tipoDeInput, input) => {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      mensaje = mensajeDeError[tipoDeInput][error];
    }
  });
  return mensaje;
};

const validarNacimiento = (input) => {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes tener al menos 18 años de edad";
  }
  input.setCustomValidity(mensaje);
};

const mayorDeEdad = (fecha) => {
  const fechaActual = new Date();
  const diferenciaFechas = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return diferenciaFechas <= fechaActual;
};
