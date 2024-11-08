import { Router } from "express";
import { getUser } from "../controllers/users.controller";

const router = Router();

router.get("/api/users/user/:userId", getUser);

export default router;
