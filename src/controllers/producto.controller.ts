import { Request, Response } from "express";
import { OkPacket, ResultSetHeader, RowDataPacket, FieldPacket } from "mysql2";
import path from "path";
import { connect } from "../database";
// get('/')
export async function getAllProducts(req: Request, res: Response) {
  try {
    const conn = await connect();
    const data: [RowDataPacket[][], FieldPacket[]] = await conn.query("CALL `SP_GetProductos`()");
    const productos = data[0][0];
    return res.json({ products: productos, success: "Datos obtenidos" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Ocurrió un error" });
  }
}
// get('/:id')
export async function getProducto(req: Request, res: Response) {}
// post('/')
export async function createProduct(req: Request, res: Response) {
  const conn = await connect();
  console.log(req.body);
  return res.json("XD");
}
// put('/:id')
export async function editProduct(req: Request, res: Response) {}
// patch('/:id')
export async function disableProduct(req: Request, res: Response) {}
