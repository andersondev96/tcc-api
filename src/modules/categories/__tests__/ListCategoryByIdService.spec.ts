import { AppError } from "@shared/errors/AppError";

import { FakeCategoriesRepository } from "../repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ListCategoryByIdService } from "../services/ListCategoryByIdService";

let fakeCategoryRepository: ICategoriesRepository;
let listCategoryByIdService: ListCategoryByIdService;


describe("ListCategoryByIdService", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoriesRepository();
    listCategoryByIdService = new ListCategoryByIdService(
      fakeCategoryRepository
    );
  });

  it("Should be able to list a category by id", async () => {
    const category = await fakeCategoryRepository.create({
      name: "Category",
      subcategories: "Category Subcategories"
    });

    const findCategory = await listCategoryByIdService.execute(category.id);

    expect(findCategory).toEqual(category);
  });

  it("Should not be able to list a category if id not found", async () => {

    await expect(
      listCategoryByIdService.execute("non-existing-category")
    ).rejects.toBeInstanceOf(AppError);
  });
});