export class User {
  id?: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  private constructor({ name, email, password }: User) {
    return Object.assign(this, {
      name,
      email,
      password,
    });
  }

  static create({ name, email, password }: User) {
    const user = new User({ name, email, password });
    return user;
  }
}
