import { Request, Response } from "express";
import path from "path";
import { connect } from "../database";

export async function indexRoute(req: Request, res: Response) {
  return res.sendFile(path.join(__dirname + "/.." + "/public/index.html"));
}
// export async function getPosts(req: Request, res: Response): Promise<Response> {
//   const conn = await connect();
//   const posts = await conn.query("SELECT * FROM posts");
//   return res.json(posts[0]);
// }
