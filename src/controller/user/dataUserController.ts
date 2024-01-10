import { Request, Response } from "express";
import { dataUserService } from "../../services/user/dataUserService";
import { verify } from "jsonwebtoken";

const dataUserController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader!.split(" ");

    const { sub } = verify(token, process.env.JWT_SECRET as string);

    const data = await dataUserService(parseInt(sub as string));

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

export { dataUserController };
