import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { ContactsRepository } from "../infra/prisma/repositories/ContactsRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { UpdateScheduleService } from "../services/UpdateScheduleService";

let fakeUsersRepository = new FakeUsersRepository();
let fakeSchedulesRepository: ISchedulesRepository;
let fakeContactsRepository: IContactsRepository;
let fakeCompaniesRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let updateScheduleService: UpdateScheduleService;


describe("UpdateSchedulesService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeSchedulesRepository = new FakeSchedulesRepository();
    fakeContactsRepository = new ContactsRepository();
    fakeCompaniesRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    updateScheduleService = new UpdateScheduleService(
      fakeCompaniesRepository,
      fakeSchedulesRepository
    );
  });

  it("Should be able to update the schedules", async () => {

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactsRepository.create({
      email: "business@example.com",
      telephone: "1234567",
      whatsapp: "12345685",
      website: "www.example.com"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompaniesRepository.create({
      name: "Business Company 1",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      contact_id: contact.id,
      physical_localization: false,
      user_id: user.id
    });

    const schedules = [
      {
        weekday: "Sunday",
        opening_time: "08:00",
        closing_time: "18:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "10:00",
        company_id: company.id,
        lunch_time: "12:00-14:00"
      },
      {
        weekday: "Tuesday",
        opening_time: "07:00",
        closing_time: "12:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    await Promise.all(
      schedules.map(schedule => fakeSchedulesRepository.create(schedule))
    );

    const schedulesCompany = await fakeSchedulesRepository.findSchedulesByCompany(company.id);

    const schedulesUpdated = [
      {
        id: schedulesCompany[0].id,
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "19:00",
        company_id: company.id,
        lunch_time: "14:00-16:00"
      },
      {
        id: schedulesCompany[1].id,
        weekday: "Saturday",
        opening_time: "09:00",
        closing_time: "16:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        id: schedulesCompany[2].id,
        weekday: "Sunday",
        opening_time: "07:00",
        closing_time: "14:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    const updateSchedules = await updateScheduleService.execute({
      company_id: company.id,
      schedules: schedulesUpdated
    });

    expect(updateSchedules).toEqual(schedulesUpdated);
    expect(updateSchedules.length).toBe(3);

    const updateSchedule = updateSchedules.find(schedule => schedule.weekday === "Monday");
    expect(updateSchedule.opening_time).toBe("08:00");
    expect(updateSchedule.closing_time).toBe("19:00");
    expect(updateSchedule.lunch_time).toBe("14:00-16:00");


  });

  it("Should be able to update the schedules if have an existing schedule", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactsRepository.create({
      email: "business@example.com",
      telephone: "1234567",
      whatsapp: "12345685",
      website: "www.example.com"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompaniesRepository.create({
      name: "Business Company 1",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      contact_id: contact.id,
      physical_localization: false,
      user_id: user.id
    });

    const schedules = [
      {
        weekday: "Sunday",
        opening_time: "08:00",
        closing_time: "18:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "10:00",
        company_id: company.id,
        lunch_time: "12:00-14:00"
      },
      {
        weekday: "Tuesday",
        opening_time: "07:00",
        closing_time: "12:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    await fakeSchedulesRepository.create({
      weekday: "Monday",
      opening_time: "09:00",
      closing_time: "12:00",
      company_id: company.id,
      lunch_time: "11:00-13:00"
    });

    await Promise.all(
      schedules.map(schedule => fakeSchedulesRepository.create(schedule))
    );

    const schedulesCompany = await fakeSchedulesRepository.findSchedulesByCompany(company.id);

    const schedulesUpdated = [
      {
        id: schedulesCompany[0].id,
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "19:00",
        company_id: company.id,
        lunch_time: "14:00-16:00"
      },
      {
        id: schedulesCompany[1].id,
        weekday: "Saturday",
        opening_time: "09:00",
        closing_time: "16:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        id: schedulesCompany[2].id,
        weekday: "Sunday",
        opening_time: "07:00",
        closing_time: "14:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        id: schedulesCompany[3].id,
        weekday: "Friday",
        opening_time: "08:00",
        closing_time: "20:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    const updateSchedules = await updateScheduleService.execute({
      company_id: company.id,
      schedules: schedulesUpdated
    });

    expect(updateSchedules).toEqual(schedulesUpdated);
    expect(updateSchedules.length).toBe(4);
  });

  it("Should be able to delete an existing schedule", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactsRepository.create({
      email: "business@example.com",
      telephone: "1234567",
      whatsapp: "12345685",
      website: "www.example.com"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompaniesRepository.create({
      name: "Business Company 1",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      contact_id: contact.id,
      physical_localization: false,
      user_id: user.id
    });

    const schedules = [
      {
        weekday: "Monday",
        opening_time: "09:00",
        closing_time: "12:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Sunday",
        opening_time: "08:00",
        closing_time: "18:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "10:00",
        company_id: company.id,
        lunch_time: "12:00-14:00"
      },
      {
        weekday: "Tuesday",
        opening_time: "07:00",
        closing_time: "12:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    await Promise.all(
      schedules.map(schedule => fakeSchedulesRepository.create(schedule))
    );

    const schedulesCompany = await fakeSchedulesRepository.findSchedulesByCompany(company.id);

    const schedulesUpdated = [
      {
        id: schedulesCompany[0].id,
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "19:00",
        company_id: company.id,
        lunch_time: "14:00-16:00"
      },
      {
        id: schedulesCompany[1].id,
        weekday: "Saturday",
        opening_time: "09:00",
        closing_time: "16:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        id: schedulesCompany[2].id,
        weekday: "Sunday",
        opening_time: "07:00",
        closing_time: "14:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    const updateSchedules = await updateScheduleService.execute({
      company_id: company.id,
      schedules: schedulesUpdated
    });

    expect(updateSchedules).toEqual(schedulesUpdated);
    expect(updateSchedules.length).toBe(3);
  });

  it("Should be able to add a new schedule non existing", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactsRepository.create({
      email: "business@example.com",
      telephone: "1234567",
      whatsapp: "12345685",
      website: "www.example.com"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompaniesRepository.create({
      name: "Business Company 1",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      contact_id: contact.id,
      physical_localization: false,
      user_id: user.id
    });

    const schedules = [
      {
        weekday: "Monday",
        opening_time: "09:00",
        closing_time: "12:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Sunday",
        opening_time: "08:00",
        closing_time: "18:00",
        company_id: company.id,
        lunch_time: "11:00-13:00"
      },
      {
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "10:00",
        company_id: company.id,
        lunch_time: "12:00-14:00"
      }
    ];

    await Promise.all(
      schedules.map(schedule => fakeSchedulesRepository.create(schedule))
    );

    const schedulesCompany = await fakeSchedulesRepository.findSchedulesByCompany(company.id);

    const schedulesUpdated = [
      {
        id: schedulesCompany[0].id,
        weekday: "Monday",
        opening_time: "08:00",
        closing_time: "19:00",
        company_id: company.id,
        lunch_time: "14:00-16:00"
      },
      {
        id: schedulesCompany[1].id,
        weekday: "Saturday",
        opening_time: "09:00",
        closing_time: "16:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        id: schedulesCompany[2].id,
        weekday: "Sunday",
        opening_time: "07:00",
        closing_time: "14:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      },
      {
        weekday: "Tuesday",
        opening_time: "06:00",
        closing_time: "17:00",
        company_id: company.id,
        lunch_time: "12:00-13:00"
      }
    ];

    const updateSchedules = await updateScheduleService.execute({
      company_id: company.id,
      schedules: schedulesUpdated
    });

    expect(updateSchedules).toEqual(schedulesUpdated);
    expect(updateSchedules.length).toBe(4);
  });
});


it("Shoud not be able to update if company not found", async () => {

  const schedules = [
    {
      weekday: "Sunday",
      opening_time: "08:00",
      closing_time: "18:00",
      company_id: "company-id"
    },
    {
      weekday: "Monday",
      opening_time: "08:00",
      closing_time: "10:00",
      company_id: "company-id"
    },
    {
      weekday: "Tuesday",
      opening_time: "07:00",
      closing_time: "12:00",
      company_id: "company-id"
    }
  ];

  await Promise.all(
    schedules.map(schedule => fakeSchedulesRepository.create(schedule))
  );

  const schedulesUpdated = [
    {
      weekday: "Friday",
      opening_time: "08:00",
      closing_time: "20:00",
      company_id: "company-id"
    },
    {
      weekday: "Saturday",
      opening_time: "09:00",
      closing_time: "16:00",
      company_id: "company-id"
    },
    {
      weekday: "Sunday",
      opening_time: "07:00",
      closing_time: "14:00",
      company_id: "company-id"
    },
    {
      weekday: "Monday",
      opening_time: "08:00",
      closing_time: "19:00",
      company_id: "company-id"
    }
  ];

  await expect(updateScheduleService.execute({
    company_id: "company-not-found",
    schedules: schedulesUpdated
  })).rejects.toBeInstanceOf(AppError);
});