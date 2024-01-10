import { Request, Response } from "express";
import { findShiftByUserIdService } from "../../services/shifts/findShiftByUserIdService";
import { dataUserService } from "../../services/user/dataUserService";
import { verify } from "jsonwebtoken";

const findShiftByUserIdController = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader!.split(" ");

  const { sub } = verify(token, process.env.JWT_SECRET as string);

  try {
    const shift = await findShiftByUserIdService(parseInt(sub as string));

    return res.status(200).json(shift);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { findShiftByUserIdController };
