import { Response, Request } from "express";
import { endShiftService } from "../../services/shifts/endShiftService";
import { verify } from "jsonwebtoken";

const endShiftController = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader!.split(" ");

    const { sub } = verify(token, process.env.JWT_SECRET as string);

    const { end_cash } = req.body;

    const shift = await endShiftService({
      id: parseInt(sub as string),
      end_cash,
    });

    res.status(200).send(shift);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { endShiftController };
