import { Router, Request, Response } from "express";
import passport from "passport";
const router = Router();

//Registrarse
router.post("/signup", async (req, res, next) => {
  passport.authenticate("local.signup", function (err, user, info) {
    if (err) return res.json({ error: err });

    if (!user) return res.json({ error: "Contraseña o Correo inválidos" });

    req.logIn(user, function (err) {
      if (err) return res.json(err);
      user.authenticate = true;
      return res.json({ success: "Sesión Iniciada", user: user });
    });
  })(req, res, next);
});

//Iniciar Session
router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", function (err, user, info) {
    if (err) return res.json({ error: err });

    if (!user) return res.json({ error: "Contraseña o Correo inválidos" });

    req.logIn(user, function (err) {
      if (err) return res.json(err);
      user.authenticate = true;
      return res.json({ success: "Sesión Iniciada", user: user });
    });
  })(req, res, next);
});

//Desconectarse
router.get("/logout", (req: Request, res: Response) => {
  req.logOut();
  res.json({ success: "Desconectado" });
});

export default router;
