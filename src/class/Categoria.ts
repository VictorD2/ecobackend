import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql";
import { connect } from "../database";
import { CategoryInterface } from "../interface/CategoryInterface";

class Categoria {
    private nombre_categoria: string;
    private color: string;
    private icono: string;
    private url: string;
    private habilitado: number;
    constructor() {
        this.nombre_categoria = "";
        this.color = "";
        this.icono = "";
        this.url = "";
        this.habilitado = 1;
    }
    asignarValores(nombre: string, color: string, icono: string, habilitado: number) {
        this.color = color
        this.nombre_categoria = nombre;
        this.icono = icono;
        this.habilitado = habilitado;
        this.url = "/" + this.nombre_categoria.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
    }
    async guardarEnBD(): Promise<CategoryInterface> {
        const conn = await connect();
        const sql = `CALL SP_InsertCategory(?,?,?,?,?,@id); SELECT @id as id_categoria;`
        const data: [RowDataPacket[][], FieldPacket[]] = await conn.query(sql, [this.nombre_categoria, this.color, this.icono, this.url, this.habilitado]);
        const id_categoria = data[0][1][0].id_categoria;
        const categoria: CategoryInterface = {
            url: this.url,
            color: this.color,
            icono: this.icono,
            nombre: this.nombre_categoria,
            id_categoria: id_categoria,
            habilitado: 1,
        }
        return categoria;
    }
    async modificarCategory(id: number) {
        const conn = await connect();
        const sql = `CALL SP_ModifiedCategory(?,?,?,?,?,?);`
        const data: [ResultSetHeader, FieldPacket[]] = await conn.query(sql, [this.nombre_categoria, this.color, this.icono, this.url, this.habilitado, id]);
        return data[0].affectedRows === 1 ? true : false;
    }
    async getCategories(): Promise<RowDataPacket[]> {
        const conn = await connect();
        const data: [RowDataPacket[][], FieldPacket[]] = await conn.query("CALL `SP_GetCategories`()");
        const categorias = data[0][0];
        return categorias;
    }
    async enableCategory(id: number, habilitado: number) {
        const habilitar = habilitado === 1 ? 0 : 1;
        const conn = await connect();
        const data: [ResultSetHeader, FieldPacket[]] = await conn.query("CALL `SP_EnableCategory`(?,?)", [id, habilitar]);
        return data[0].affectedRows === 1 ? true : false;
    }
    async deleteCategory(id: number) {
        const conn = await connect();
        const data: [ResultSetHeader, FieldPacket[]] = await conn.query("CALL `SP_DeleteCategory`(?)", [id]);
        console.log(data);
        return data[0].affectedRows === 1 ? true : false;
    }
}

export default new Categoria();