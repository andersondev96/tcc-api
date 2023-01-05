export class Customer {
  id?: string;
  user_id: string;
  telephone?: string;
  status?: string;

  constructor({ user_id }: Customer) {
    return Object.assign(this, {
      user_id
    });
  }
}