import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const router = Router();

router.post("/api/auth/sign-up", signUp);

router.post("/api/auth/sign-in", signIn);

export default router;
