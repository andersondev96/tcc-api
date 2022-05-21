import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import AppError from "@shared/errors/AppError";

import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

interface IPayload {
  sub: string;
  email: string;
}

/* interface ITokenResponse {
  token: string;
  refresh_token: string;
}
 */
@injectable()
export class RefreshTokenUserService {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string) /* :Promise<ITokenResponse> */ {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokenRepository.findByUserAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );

    await this.usersTokenRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    /* const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: authConfig.expires_in_token,
    }); */

    return refresh_token;
  }
}
