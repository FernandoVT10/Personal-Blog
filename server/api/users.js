import jwtAuthentication from "../utils/jwtAuthentication";
import User from "../models/User";
import { JWT_SECRET_KEY, PASSWORD_SALT } from "../config/constants";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/verifyToken/", jwtAuthentication, async (req, res) => {
    try {
        if(await User.exists({ _id: req.userId })) {
            res.json({ status: true, verifyToken: true });
        } else {
            res.json({ status: true, verifyToken: false });
        }
    } catch {
        res.sendStatus(403);
    }
});

// router.post("/register/", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         if(password) {
//             const passwordHash = bcrypt.hashSync(password, PASSWORD_SALT);

//             await User.create({ username, password: passwordHash });

//             res.json({ status: true, message: "You have successfully registered" });
//         } else {
//             res.json({ status: false, error: {
//                 message: "The parameter password is required"
//             } });
//         }
//     } catch (error) {
//         res.json({ status: false, error });
//     }
// });

router.post("/login/", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if(user) {
            if(bcrypt.compareSync(password, user.password)) {

                const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY);

                res.json({
                    status: true,
                    message: "You successfully logged in",
                    token
                });

            } else {
                res.json({ status: false, error: {
                    message: "The username or password are incorrect"
                } });
            }
        } else {
            res.json({ status: false, error: {
                message: "The username doesn't exists"
            } });
        }
    } catch (error) {
        res.json({ status: false, error });
    }
});

export default router;