import { FakeCacheProvider } from "@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import { FakeCategoriesRepository } from "../repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ListCategoryByNameService } from "../services/ListCategoryByNameService";

let fakeCategoryRepository: ICategoriesRepository;
let fakeCacheProvider: ICacheProvider;
let listCategoriesByNameService: ListCategoryByNameService;

describe("ListAllCategoriesService", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listCategoriesByNameService = new ListCategoryByNameService(
      fakeCategoryRepository,
      fakeCacheProvider
    );
  });

  it("Should be able to list category", async () => {

    const category1 = await fakeCategoryRepository.create({
      name: "Category 1", subcategories: "Subcategory 1"
    });

    await fakeCategoryRepository.create({
      name: "Category 3", subcategories: "Subcategory 2"
    });

    await fakeCategoryRepository.create({
      name: "Category 2", subcategories: "Subcategory 2"
    });

    const categories = await listCategoriesByNameService.execute(
      "Category 1"
    );

    expect(categories).toEqual(category1);
  });
});