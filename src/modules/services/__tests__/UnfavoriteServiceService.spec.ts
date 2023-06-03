import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { UnfavoriteServiceService } from "../services/UnfavoriteServiceService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let fakeServiceRepository: IServicesRepository;
let unfavoriteServiceService: UnfavoriteServiceService;

describe("GetFavoritesService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeServiceRepository = new FakeServicesRepository();
    unfavoriteServiceService = new UnfavoriteServiceService(
      fakeServiceRepository,
      fakeUserRepository
    );
  });

  it("Should be able to get favorite", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      email: "business@example.com",
      telephone: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Example",
      subcategories: "Subcategory Example"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business name",
      cnpj: "123456",
      category_id: category.id,
      description: "Business Description",
      services: ["Service 1"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const service = await fakeServiceRepository.create({
      name: "Service One",
      description: "Service Description",
      price: 20.0,
      category: "Subcategory Example",
      company_id: company.id,
      highlight_service: true,
      favorites: 1
    });

    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites.push(service.id);

    await unfavoriteServiceService.execute({
      user_id: user.id,
      service_id: service.id
    });

    const serviceFavorite = await fakeServiceRepository.findServiceById(service.id);

    const favoritesUser = await fakeUserRepository.update({
      id: user.id,
      ...user
    });

    expect(serviceFavorite.favorites).toEqual(0);
    expect(favoritesUser.favorites).toEqual([]);

  });

  it("Should not be able to get favorite when service does not exist", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Example",
      subcategories: "Subcategory Example"
    });

    const contact = await fakeContactRepository.create({
      email: "business@example.com",
      telephone: "123456"
    });

    await fakeCompanyRepository.create({
      name: "Business name",
      cnpj: "123456",
      category_id: category.id,
      description: "Business Description",
      services: ["Service 1"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    await expect(
      unfavoriteServiceService.execute({
        user_id: user.id,
        service_id: "invalid service"
      })
    ).rejects.toBeInstanceOf(AppError);

  });
});