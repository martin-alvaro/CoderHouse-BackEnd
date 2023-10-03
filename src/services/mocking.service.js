import { faker } from '@faker-js/faker';

const generateMockProducts = () => {
  const mockProducts = [];

  for (let i = 1; i <= 100; i++) {
    const product = {
      _id: `product${i}`,
      title: faker.commerce.productName(),
      description: faker.commerce.productMaterial(),
      price: faker.number.int({ min: 10, max:  1000}),
      category: faker.commerce.product(),
      code: `ABC${i}`,
      stock: parseInt(faker.random.numeric(6, { bannedDigits: ['0'] })),
      thumbnails: faker.internet.avatar(),
      status: faker.datatype.boolean(),
    };

    mockProducts.push(product);
  }

  return mockProducts;
};

export const getMockProducts = (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
};
