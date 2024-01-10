import { Response, Request } from "express";
import { startShiftService } from "../../services/shifts/startShiftService";
import { verify } from "jsonwebtoken";

const startShiftController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader!.split(" ");

    const { sub } = verify(token, process.env.JWT_SECRET as string);

    const { start_cash } = req.body;

    const user_id = parseInt(sub as string);

    const shift = await startShiftService({ user_id, start_cash });

    res.status(200).json(shift);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export { startShiftController };
