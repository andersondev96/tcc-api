import { FakeCategoriesRepository } from "../repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
import { ListSubcategoriesToCategoriesService } from "../services/ListSubcategoriesToCategoriesService";


let fakeCategoryRepository: ICategoriesRepository;
let listSubcategoriesToCategoryService: ListSubcategoriesToCategoriesService;

describe("ListSubcategoriesToCategoriesService", () => {
  beforeEach(() => {
    fakeCategoryRepository = new FakeCategoriesRepository();
    listSubcategoriesToCategoryService = new ListSubcategoriesToCategoriesService(
      fakeCategoryRepository
    );
  });

  it("Should be able to list subcategories by category id", async () => {
    const category = await fakeCategoryRepository.create({
      name: "Projetos de arquitetura",
      subcategories: "Contrução,Desenho,Modelagem,Projeto"
    });

    const subcategories = await listSubcategoriesToCategoryService.execute(
      category.id
    );

    expect(subcategories).toEqual(["Contrução", "Desenho", "Modelagem", "Projeto"]);
  });
});