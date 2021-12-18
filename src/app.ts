import express, { Application } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import session from "express-session";
import MySQLStore from "express-mysql-session";
import { connect } from "./database";
import "./lib/passport.ts";
//Routes
import ProductoRoutes from "./routes/producto.routes";
import CategoriaRoutes from "./routes/categoria.routes";
import AuthRoutes from "./routes/auth.routes";
import IndexRoutes from "./routes/index.routes";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || 4000 || process.env.PORT);
    dotenv.config();
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.use(express.static(path.join(__dirname, "/public/build")));
    this.app.use(
      cors({
        origin: process.env.API, //Asi el frontend puede hacer peticiones
        credentials: true,
      })
    );
    // Global Variables
    // this.app.use(async (req, res, next) => {
    //   // console.log(req.user);
    //   //   this.app.locals.user = req.user;
    //   next();
    // });
  }

  routes() {
    this.app.use("/api/v0/categorias", CategoriaRoutes);
    this.app.use("/api/v0/productos", ProductoRoutes);
    this.app.use(AuthRoutes);
    this.app.use(IndexRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get("port"));
    console.log("Server on port ", this.app.get("port"));
  }
}
