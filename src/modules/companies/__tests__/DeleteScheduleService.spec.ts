import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { DeleteScheduleService } from "../services/DeleteScheduleService";

let fakeScheduleRepository: ISchedulesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let deleteScheduleService: DeleteScheduleService;

describe("DeleteScheduleService", () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeSchedulesRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    deleteScheduleService = new DeleteScheduleService(
      fakeScheduleRepository
    );
  });

  it("Should be able to delete a schedule", async () => {
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

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const schedule = await fakeScheduleRepository.create({
      weekday: "Monday",
      opening_time: "08:00",
      closing_time: "18:00",
      lunch_time: "12:00-13:00",
      company_id: company.id
    });

    await deleteScheduleService.execute(schedule.id);

    const findSchedule = await fakeScheduleRepository.findById(schedule.id);

    expect(findSchedule).toBe(undefined);
  });

  it("Should not be able to delete a non existing schedule", async () => {
    await expect(
      deleteScheduleService.execute("not-existing-schedule")
    ).rejects.toBeInstanceOf(AppError);
  });
});