import add from "dayjs";
import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";

import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
export class RefreshTokenUserService {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const { email, sub } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;

    const user_id = sub;

    console.log(user_id);

    const userToken = await this.usersTokenRepository.findByUserAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: sub,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    const expires_date = add(30, authConfig.expires_in_refresh_token).toDate();

    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, authConfig.secret_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_token,
    });

    return {
      refresh_token,
      token: newToken,
    };
  }
}
