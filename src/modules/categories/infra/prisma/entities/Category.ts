
export class Category {
  id?: string;

  name: string;

  constructor({ name }: Category) {
    return Object.assign(this, {
      name
    });
  }
}