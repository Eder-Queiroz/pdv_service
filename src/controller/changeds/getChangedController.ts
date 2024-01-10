import { Response, Request } from "express";
import { getChangedService } from "../../services/changeds/getChangedService";

const getChangedController = async (req: Request, res: Response) => {
  try {
    const { shift_id, start_time, end_time, limit, offset } = req.query;

    const changeds = await getChangedService({
      shift_id,
      start_time,
      end_time,
      limit,
      offset,
    });

    return res.status(200).json(changeds);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

export { getChangedController };
