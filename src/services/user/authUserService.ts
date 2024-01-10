import { UserType } from "./type";
import { getName } from "./repository";
import { findShiftByUserId } from "../shifts/repository";
import { ApiError } from "../../config/Error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

const authUserService = async ({ name, password }: UserType) => {
  try {
    if (!name || !password) throw new ApiError("Dados inválidos", null);

    const userExists = await getName(name);

    if (!userExists) throw new ApiError("Usuário/senha incorreta.", null);

    const user = userExists.get();

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new ApiError("Usuário/senha incorreta.", null);

    const token = sign(
      { name: user.name, role: user.role },
      process.env.JWT_SECRET as string,
      {
        subject: user.id.toString(),
        expiresIn: "1d",
      }
    );

    const shift = await findShiftByUserId(user.id);

    const is_opened = shift?.getDataValue("is_opened");

    return {
      user: {
        name: user.name,
        role: user.role,
        is_opened,
      },
      token,
    };
  } catch (error) {
    throw new ApiError("Erro ao autenticar um usuário", error);
  }
};

export { authUserService };
