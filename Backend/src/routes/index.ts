import Router, { Request, Response } from "express";
import UserRouter from "./user";
import AccountRouter from "./account";

const router = Router();

router.use("/user", UserRouter);
router.use("/account", AccountRouter);


export default router;
