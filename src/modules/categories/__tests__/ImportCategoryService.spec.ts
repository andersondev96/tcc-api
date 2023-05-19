import { FakeCacheProvider } from "@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import { CategoriesRepository } from "../infra/prisma/repositories/CategoriesRepository";
import { FakeXlsProvider } from "../providers/Fakes/FakeXlsProvider";
import { IXlsxProvider } from "../providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ImportCategoryService } from "../services/ImportCategoryService";


describe("ImportCategoryService", () => {
  let fakeCategoryRepository: ICategoriesRepository;
  let fakeXlsProvider: IXlsxProvider;
  let fakeCacheProvider: ICacheProvider;
  let importCategoryService: ImportCategoryService;

  beforeEach(() => {
    fakeCategoryRepository = new CategoriesRepository();
    fakeXlsProvider = new FakeXlsProvider();
    fakeCacheProvider = new FakeCacheProvider();
    importCategoryService = new ImportCategoryService(
      fakeCategoryRepository,
      fakeXlsProvider,
      fakeCacheProvider
    );
  });

  it("Should be able to import categories", async () => {
    const filePath = "categories.xlsx";
    const categories = [
      { id: "category-1", name: "Category 1", subcategories: "Subcategory 1" },
      { id: "category-2", name: "Category 2", subcategories: "Subcategory 2" },
      { id: "category-3", name: "Category 3", subcategories: "Subcategory 3" }
    ];

    jest.spyOn(fakeXlsProvider, "readXlsxProvider").mockResolvedValue(categories);
    jest.spyOn(fakeCategoryRepository, "create");

    await importCategoryService.execute(filePath);

    expect(fakeXlsProvider.readXlsxProvider).toHaveBeenCalledWith(filePath);
    expect(fakeCategoryRepository.create).toHaveBeenCalledTimes(3);
  });

  it("Should not be able to import categories if name is undefined", async () => {
    const filePath = "categories.xlsx";
    const categories = [
      { id: "category-1", name: "Category 1", subcategories: "Subcategory 1" },
      { id: "category-2", name: undefined, subcategories: "Subcategory 2" },
      { id: "category-3", name: "Category 3", subcategories: "Subcategory 3" }
    ];

    jest.spyOn(fakeXlsProvider, "readXlsxProvider").mockResolvedValue(categories);
    jest.spyOn(fakeCategoryRepository, "create");

    await importCategoryService.execute(filePath);

    expect(fakeXlsProvider.readXlsxProvider).toHaveBeenCalledWith(filePath);
    expect(fakeCategoryRepository.create).toHaveBeenCalledTimes(2);
  });
});