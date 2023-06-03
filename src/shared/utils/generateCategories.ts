import { faker } from "@faker-js/faker";

interface ICategory {
  name: string;
}

export function generateCategories(categorySize: number): ICategory[] {
  const categories: ICategory[] = [];
  for (let i = 0; i < categorySize; i++) {
    const category = {
      name: faker.name.jobTitle()
    };

    categories.push(category);
  }

  return categories;
}