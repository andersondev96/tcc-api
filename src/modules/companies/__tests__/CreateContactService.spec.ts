import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { CreateContactService } from "../services/CreateContactService";

let fakeContactRepository: IContactsRepository;
let createContactService: CreateContactService;

describe("CreateContactService", () => {
    beforeEach(() => {
        fakeContactRepository = new FakeContactsRepository();
        createContactService = new CreateContactService(fakeContactRepository);
    })

    it("Should be able to create a contact", async () => {
        const contact = await createContactService.execute({
            email: "business@example.com",
            telephone: "1234567",
            whatsapp: "12345685",
            website: "www.example.com",
        })

        expect(contact).toHaveProperty("id");
    })
})