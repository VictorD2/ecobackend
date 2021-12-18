import { Request, Response } from "express";
import * as validaciones from '../lib/regularExpr'
import Categoria from '../class/Categoria';

// Crear Categoria
export async function createCategory(req: Request, res: Response) {
  try {
    const { color, icono, nombre } = req.body;
    if (!validaciones.validarNombre(nombre).verificacion) return res.json({ error: validaciones.validarNombre(nombre).message });
    Categoria.asignarValores(nombre, color, icono, 1);
    const categoria = await Categoria.guardarEnBD();
    return res.json({ success: "Categoría creada", categoria }).status(201);
  } catch (error: any) {
    console.log(error)
    return res.json({ error: "Ocurrió un error", message: error.message }).status(400);
  }
}
// Modificar Categoria
export async function editCategory(req: Request, res: Response) {
  try {
    const { color, icono, nombre, habilitado } = req.body;
    const { id } = req.params;
    req.body.url = "/" + nombre.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
    Categoria.asignarValores(nombre, color, icono, habilitado);
    const modified = await Categoria.modificarCategory(parseInt(id));
    return modified ?
      res.json({ success: `Categoría modificada`, categoria: req.body }).status(200) :
      res.json({ error: "Ocurrió un error", message: "No se pudo modificar" }).status(400);
  } catch (error: any) {
    console.log(error)
    return res.json({ error: "Ocurrió un error", message: error.message }).status(400);
  }
}

// Eliminar Categoria
export async function deleteCategory(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await Categoria.deleteCategory(parseInt(id));
    return deleted ?
      res.json({ success: `Categoría eliminada` }).status(200) :
      res.json({ error: "Ocurrió un error", message: "No se pudo eliminar" }).status(400);
  } catch (error: any) {
    console.log(error)
    return res.json({ error: "Ocurrió un error", message: error.message }).status(400);
  }
}

// Habilitar / Deshabilitar categoria
export async function enableCategory(req: Request, res: Response) {
  try {
    const { habilitado } = req.body;
    const { id } = req.params;
    const habilitar = habilitado === 1 ? "Deshabilitada" : "Habilitada";
    const habilitarNumber = habilitado === 1 ? 0 : 1;
    const modified = await Categoria.enableCategory(parseInt(id), habilitado);
    return modified ?
      res.json({ success: `Categoría ${habilitar}`, habilitado: habilitarNumber }).status(200) :
      res.json({ error: "Ocurrió un error", message: "No se pudo modificar" }).status(400);
  } catch (error: any) {
    console.log(error)
    return res.json({ error: "Ocurrió un error", message: error.message }).status(400);
  }
}

// Obtener todas las categorias
export async function getAllCategories(req: Request, res: Response) {
  try {
    const categorias = await Categoria.getCategories();
    return res.json({ success: "Datos obtenidos", categorias }).status(200);
  } catch (error: any) {
    console.log(error)
    return res.json({ error: "Ocurrió un error", message: error.message }).status(400);
  }
}
