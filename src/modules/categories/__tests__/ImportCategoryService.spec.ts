import { CategoriesRepository } from "../infra/prisma/repositories/CategoriesRepository";
import { XlsxProviderFaker } from "../providers/Fakes/XlsxProviderFaker";
import { IXlsxProvider } from "../providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ImportCategoryService } from "../services/ImportCategoryService";


describe("ImportCategoryService", () => {
  let categoryRepository: ICategoriesRepository;
  let xlsxProviderFaker: IXlsxProvider;
  let importCategoryService: ImportCategoryService;

  beforeEach(() => {
    categoryRepository = new CategoriesRepository();
    xlsxProviderFaker = new XlsxProviderFaker();
    importCategoryService = new ImportCategoryService(
      categoryRepository,
      xlsxProviderFaker
    );
  });

  it("Should be able to import categories", async () => {
    const filePath = "categories.xlsx";
    const categories = [
      { id: "category-1", name: "Category 1", subcategories: "Subcategory 1", createdAt: new Date(), updatedAt: new Date() },
      { id: "category-2", name: "Category 2", subcategories: "Subcategory 2", createdAt: new Date(), updatedAt: new Date() },
      { id: "category-3", name: "Category 3", subcategories: "Subcategory 3", createdAt: new Date(), updatedAt: new Date() }
    ];

    jest.spyOn(xlsxProviderFaker, "readXlsxProvider").mockResolvedValue(categories);

    await importCategoryService.execute(filePath);

    expect(xlsxProviderFaker.readXlsxProvider).toHaveBeenCalledWith(filePath);
  });
});