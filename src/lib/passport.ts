import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
  "local.signin",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email: string, password: string, done) => {
      console.log(req.body);
      console.log(email);
      console.log(password);
      return done(null, false, { message: "El correo ya está en uso" });
    }
  )
);

passport.use(
  "local.signup",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email: string, password: string, done) => {
      console.log(req.body);
      console.log(email);
      console.log(password);
      return done(null, false, { message: "El correo ya está en uso" });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user: Express.User, done) => {
  done(null, user);
});
