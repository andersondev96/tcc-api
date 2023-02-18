
import { AppError } from "@shared/errors/AppError";

import { FakeCategoriesRepository } from "../repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

let fakeCategoryRepository: ICategoriesRepository;
let createCategoryService: CreateCategoryService;

describe("CreateCategoryService", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(fakeCategoryRepository);
  });

  it("Should be able to create a category", async () => {
    const category = await createCategoryService.execute("Agricultura", "Plantação, Terra, Adubo");

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a category if category already exists", async () => {
    await fakeCategoryRepository.create({
      name: "Agricultura"
    });

    await expect(createCategoryService.execute("Agricultura")).rejects.toBeInstanceOf(AppError);
  });
});

