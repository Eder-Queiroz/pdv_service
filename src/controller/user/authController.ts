import { Request, Response } from "express";
import { authUserService } from "../../services/user/authUserService";

const authUserController = async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    const user = await authUserService({ name, password });

    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { authUserController };
