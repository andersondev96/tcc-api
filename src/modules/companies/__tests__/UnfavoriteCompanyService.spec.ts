import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { UnfavoriteCompanyService } from "../services/UnfavoriteCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let unfavoriteCompanyService: UnfavoriteCompanyService;

describe("FavoriteCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    unfavoriteCompanyService = new UnfavoriteCompanyService(
      fakeUserRepository,
      fakeCompanyRepository
    );
  });

  it("Should be able to favorite a company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const favoriteCompany = await fakeCompanyRepository.favoriteCompany(company.id);

    if (!user.favorites) {
      user.favorites = [];
    }

    user.favorites.push(company.id);

    await unfavoriteCompanyService.execute(user.id, company.id);

    const favoritesUser = await fakeUserRepository.update({
      id: user.id,
      ...user
    });

    expect(favoriteCompany.favorites).toEqual(0);
    expect(favoritesUser.favorites).toEqual([]);
  });

  it("Should not be able to unfavorite a company if company not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    await expect(unfavoriteCompanyService.execute(
      user.id,
      "company-not-found"
    )).rejects.toBeInstanceOf(AppError);
  });
});