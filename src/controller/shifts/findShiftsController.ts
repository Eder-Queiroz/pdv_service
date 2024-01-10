import { Response, Request } from "express";
import { findShiftsService } from "../../services/shifts/findShiftsService";

const findShiftsController = async (req: Request, res: Response) => {
  try {
    const { user_id, start_time, end_time, is_opened, limit, offset } =
      req.query;

    const shifts = await findShiftsService({
      user_id,
      start_time,
      end_time,
      is_opened,
      limit,
      offset,
    });

    res.status(200).send(shifts);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { findShiftsController };
