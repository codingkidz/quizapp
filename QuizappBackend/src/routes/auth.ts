import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const authRouter = Router();

authRouter.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res) => {
    res.json({
      message: "Signup Successful",
      user: req.user,
    });
  }
);

authRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async function (err, user) {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

export { authRouter };
