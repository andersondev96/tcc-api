import { FakeServicesOfferedRepository } from "../repositories/fakes/FakeServicesOfferedRepository";
import { IServicesOfferedRepository } from "../repositories/IServicesOfferedRepository"
import { CreateServiceOfferedService } from "../services/CreateServiceOfferedService";

let fakeServiceOffered: IServicesOfferedRepository;
let createServiceOfferedService: CreateServiceOfferedService;

describe("CreateServiceOfferedService", () => {
    beforeEach(() => {
        fakeServiceOffered = new FakeServicesOfferedRepository();
        createServiceOfferedService = new CreateServiceOfferedService(
            fakeServiceOffered
        );
    });

    it("Should be able to create a new service offered", async () => {

        const serviceOffered = await createServiceOfferedService.execute(
            "New Service"
        );

        expect(serviceOffered).toHaveProperty("id");
    })
})