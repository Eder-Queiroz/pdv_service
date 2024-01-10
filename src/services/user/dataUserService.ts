import { findUserById } from "./repository";
import { findShiftByUserId } from "../shifts/repository";
import { UserType } from "./type";
import { ApiError } from "../../config/Error";

const dataUserService = async (id: number) => {
  try {
    const user = await findUserById(id);

    const dataUser: UserType = user?.get();

    const shift = await findShiftByUserId(id);

    const is_opened = shift?.getDataValue("is_opened");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const data = {
      ...dataUser,
      is_opened: is_opened ? true : false,
    };

    return data;
  } catch (error) {
    throw new ApiError("Error while find data user", error);
  }
};

export { dataUserService };
