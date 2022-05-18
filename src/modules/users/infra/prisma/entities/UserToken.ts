import { User } from "./User";

export class UserToken {
  id?: string;
  expires_date: string;
  refresh_token: string;
  user: User;
  user_id: string;
  created_at?: string;
  updated_at?: Date;

  private constructor({
    expires_date,
    refresh_token,
    user,
    user_id,
  }: UserToken) {
    return Object.assign(this, {
      expires_date,
      refresh_token,
      user,
      user_id,
    });
  }

  static create({ expires_date, refresh_token, user, user_id }: UserToken) {
    const userToken = new UserToken({
      expires_date,
      refresh_token,
      user,
      user_id,
    });
    return userToken;
  }
}
