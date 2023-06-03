export class UserToken {
  id?: string;
  expires_date: Date;
  refresh_token: string;
  user_id: string;
  created_at?: string;
  updated_at?: Date;

  private constructor({ expires_date, refresh_token, user_id }: UserToken) {
    return Object.assign(this, {
      expires_date,
      refresh_token,
      user_id,
    });
  }

  static create({ expires_date, refresh_token, user_id }: UserToken) {
    const userToken = new UserToken({
      expires_date,
      refresh_token,
      user_id,
    });
    return userToken;
  }
}
