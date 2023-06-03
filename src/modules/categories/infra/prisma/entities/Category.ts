
export class Category {
  id?: string;

  name: string;

  subcategories?: string;

  createdAt?: Date;

  updatedAt?: Date;

  constructor({ name }: Category) {
    return Object.assign(this, {
      name
    });
  }
}