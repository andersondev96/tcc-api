import { FakeCategoriesRepository } from "../repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ListAllCategoriesService } from "../services/ListAllCategoriesService";

let fakeCategoryRepository: ICategoriesRepository;
let listAllCategoriesService: ListAllCategoriesService;

describe("ListAllCategoriesService", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoriesRepository();
    listAllCategoriesService = new ListAllCategoriesService(
      fakeCategoryRepository
    );
  });

  it("Should be able to list all categories", async () => {

    const category1 = await fakeCategoryRepository.create({
      name: "Category 1", subcategories: "Subcategory 1"
    });

    const category2 = await fakeCategoryRepository.create({
      name: "Category 3", subcategories: "Subcategory 2"
    });

    const category3 = await fakeCategoryRepository.create({
      name: "Category 2", subcategories: "Subcategory 2"
    });

    const categories = await listAllCategoriesService.execute();

    expect(categories).toEqual([category1, category2, category3]);
  });
});