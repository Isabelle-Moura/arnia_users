export const userMock = {
  id: 1,
  email: 'test@teste.com',
  password: 'testing',
  isActive: true,
  createdAt: new Date(),
  deletedAt: new Date(),
  address: {
    id: 1,
    street: 'test',
    city: 'test',
    zipCode: 'test',
    createdAt: new Date(),
    updatedAt: new Date(),
    user: null,
  },
  pets: [],
  events: [],
};
