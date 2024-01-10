import { Response, Request } from "express";
import { registerChangedService } from "../../services/changeds/regiterChangedService";

const registerChangedController = async (req: Request, res: Response) => {
  try {
    const { shift_id, value } = req.body;

    const changed = await registerChangedService({ shift_id, value });

    return res.status(201).json(changed);
  } catch (error: any) {
    return res.status(400).json(error.message);
  }
};

export { registerChangedController };
