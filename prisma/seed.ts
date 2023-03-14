import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  Array.from({ length: 10 }).map(async () => {
    await prisma.user.create({
      data: {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    });
  });

  Array.from({ length: 5 }).map(async () => {
    await prisma.entrepreneur.create({
      data: {
        user: {
          create: {
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            Company: {
              create: {
                name: faker.company.name(),
                cnpj: faker.random.alpha(13),
                category: {
                  create: {
                    name: faker.commerce.department(),
                    subcategories: faker.commerce.productAdjective()
                  }
                },
                physical_localization: true,
                description: faker.lorem.text(),
                services: faker.helpers.arrayElements(),
                contact: {
                  create: {
                    telephone: faker.phone.number(),
                    whatsapp: faker.phone.number(),
                    email: faker.internet.email(),
                    website: faker.internet.url()
                  }
                },
                Address: {
                  create: {
                    cep: faker.address.zipCode(),
                    street: faker.address.street(),
                    district: faker.address.secondaryAddress(),
                    number: faker.datatype.number(),
                    state: faker.address.stateAbbr(),
                    city: faker.address.cityName(),
                    latitude: Number(faker.address.latitude()),
                    longitude: Number(faker.address.longitude())
                  }
                },
                Schedule: {
                  createMany: {
                    data: [
                      {
                        weekday: faker.date.weekday(),
                        opening_time: faker.random.numeric(),
                        closing_time: faker.random.numeric(),
                        lunch_time: faker.random.numeric()
                      },
                      {
                        weekday: faker.date.weekday(),
                        opening_time: faker.random.numeric(),
                        closing_time: faker.random.numeric(),
                        lunch_time: faker.random.numeric()
                      },
                      {
                        weekday: faker.date.weekday(),
                        opening_time: faker.random.numeric(),
                        closing_time: faker.random.numeric(),
                        lunch_time: faker.random.numeric()
                      }
                    ]
                  }
                },
                Service: {
                  createMany: {
                    data: [
                      {
                        name: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: Number(faker.commerce.price()),
                        category: faker.commerce.department()
                      },
                      {
                        name: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: Number(faker.commerce.price()),
                        category: faker.commerce.department()
                      },
                      {
                        name: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: Number(faker.commerce.price()),
                        category: faker.commerce.department()
                      },
                      {
                        name: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: Number(faker.commerce.price()),
                        category: faker.commerce.department()
                      },
                      {
                        name: faker.commerce.product(),
                        description: faker.commerce.productDescription(),
                        price: Number(faker.commerce.price()),
                        category: faker.commerce.department()
                      }
                    ]
                  }
                }
              }
            }

          }
        }
      }
    });
  });
}

main().catch(e => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect;
});