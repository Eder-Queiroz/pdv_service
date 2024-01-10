import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUserService";

const createUserController = async (req: Request, res: Response) => {
  try {
    const { name, password, role } = req.body;

    await createUserService({ name, password, role });

    res.status(201).json("Usuário criado com sucesso");
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { createUserController };
