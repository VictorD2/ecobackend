import { Validacion } from "../interface/Validacion";

const exprRegular = {
  // usuario: /^[a-zA-Z0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ.\s]{1,50}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // name@example.com
  telefono: /^[0-9-+\s]{9,14}$/, // 9 a 14 numeros.
  rut: /^[0-9-]{8,10}$/,
  precio: /^[0-9.]+$/,
  digitos: /^[0-9]+$/,
  url: /^(ftp|http|https):\/\/[^ "]+$/,
};
export const validarNombre = (valor: string): Validacion => {
  if (exprRegular.nombre.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "Solo letras y espacios", verificacion: false };
};
export const validarPassword = (valor: string): Validacion => {
  if (exprRegular.password.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "La contraseña debe ser mayor o igual a 4 caracteres", verificacion: false };
};

export const validarCorreo = (valor: string): Validacion => {
  if (exprRegular.correo.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "No coincide al formato de correo, ejemplo: name@example.com", verificacion: false };
};

export const validarTelefono = (valor: string): Validacion => {
  if (exprRegular.telefono.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "Solo números de 9 a 14 digitos", verificacion: false };
};
export const validarPrecio = (valor: string): Validacion => {
  if (exprRegular.precio.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "Solo números y .", verificacion: false };
};

export const validarUrl = (valor: string): Validacion => {
  if (exprRegular.url.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "No coincide al formato de URL", verificacion: false };
};
export const validarDigitos = (valor: string): Validacion => {
  if (exprRegular.url.test(valor)) return { message: "Coindide", verificacion: true };
  return { message: "Solo números", verificacion: false };
};
