const assert = require('assert');
const carController = require('../../controllers/carController');
const carModel = require('../../models/carModel');
const { v4: uuidv4 } = require('uuid');

describe('It should test all functions in an unitary way', () => {
    describe('readAllCars', () => {
        it('should return all cars', async () => {
            const car = {
                id: uuidv4(),
                registration_plate: 'ABC123',
                chassis_number: '123456789',
                renavam: '987654321',
                model: 'Model X',
                brand: 'Brand Y',
                year: 2022,
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00'
            };
            const req = {};
            const res = {
                status: function (statusCode) {
                    return this;
                },
                json: function (data) {
                    return data;
                }
            };

            carModel.readAllCars = async () => {
                return [car];
            };

            const response = await carController.readAllCars(req, res);

            assert.deepStrictEqual(response, [car]);
        });
    });

    describe('createCar', () => {
        it('should create a new car', async () => {
            const newCar = {
                id: uuidv4(),
                registration_plate: 'ABC123',
                chassis_number: '123456789',
                renavam: '987654321',
                model: 'Model Y',
                brand: 'Brand Z',
                year: 2022,
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00'
            };
            const req = { body: newCar };
            const res = {
                status: function (statusCode) {
                    return this;
                },
                json: function (data) {
                    return data;
                }
            };

            carModel.createCar = async (carData) => {
                return { newCar, message: 'Just created a new car!' };
            };

            const response = await carController.createCar(req, res);

            assert.deepStrictEqual(response, { newCar, message: 'Just created a new car!' });
        });
    });

    describe('readCarById', () => {
        it('should return the car with the specified id', async () => {
            const carId = uuidv4();
            const car = {
                id: carId,
                registration_plate: 'ABC123',
                chassis_number: '123456789',
                renavam: '987654321',
                model: 'Model X',
                brand: 'Brand Y',
                year: 2022,
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00'
            };
            const req = { params: { id: carId } };
            const res = {
                status: function (statusCode) {
                    this.statusCode = statusCode;
                    return this;
                },
                json: function (data) {
                    this.data = data;
                    return this;
                }
            };

            carModel.readCarById = async (id) => {
                if (id === carId) {
                    return car;
                } else {
                    return null;
                }
            };

            await carController.readCarById(req, res);

            assert.strictEqual(res.statusCode, 201);
            assert.deepStrictEqual(res.data, car);
        });

        it('should return error message when car is not found', async () => {
            const carId = uuidv4();
            const req = { params: { id: carId } };
            const res = {
                status: function (statusCode) {
                    this.statusCode = statusCode;
                    return this;
                },
                json: function (data) {
                    this.data = data;
                    return this;
                }
            };

            carModel.readCarById = async () => {
                return null;
            };

            await carController.readCarById(req, res);

            assert.strictEqual(res.statusCode, 404);
            assert.deepStrictEqual(res.data, { error: 'Car not found' });
        });
    });

    describe('updateCarById', () => {
        it('should update the car with the specified id', async () => {
            const updatedCar = {
                id: uuidv4(),
                registration_plate: 'XYZ789',
                chassis_number: '987654321',
                renavam: '123456789',
                model: 'Updated Model',
                brand: 'Updated Brand',
                year: 2023,
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00'
            };
            const req = {
                params: { id: updatedCar.id },
                body: updatedCar
            };
            let response;

            carModel.updateCarById = async (id, carData) => {
                assert.strictEqual(id, updatedCar.id);
                assert.deepStrictEqual(carData, updatedCar);
                return { message: 'Successfully updated car' };
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 200);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.updateCarById(req, res);

            assert.deepStrictEqual(response, { message: 'Successfully updated car' });
        });

        it('should return error message when car is not found', async () => {
            const updatedCar = {
                id: uuidv4(),
                registration_plate: 'XYZ789',
                chassis_number: '987654321',
                renavam: '123456789',
                model: 'Updated Model',
                brand: 'Updated Brand',
                year: 2023,
                created_at: '2023-01-01 00:00:00',
                updated_at: '2023-01-01 00:00:00'
            };
            const req = {
                params: { id: updatedCar.id },
                body: updatedCar
            };
            let response;

            carModel.updateCarById = async (id, carData) => {
                assert.strictEqual(id, updatedCar.id);
                assert.deepStrictEqual(carData, updatedCar);
                return null;
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 404);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.updateCarById(req, res);

            assert.deepStrictEqual(response, { error: 'Car not found' });
        });
    });

    describe('permanentDeleteCarById', () => {
        it('should permanently delete the car with the specified id', async () => {
            const carId = uuidv4();
            const req = {
                params: { id: carId }
            };
            let response;

            carModel.permanentDeleteCarById = async (id) => {
                assert.strictEqual(id, carId);
                return { message: 'Car permanently deleted' };
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 200);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.permanentDeleteCarById(req, res);

            assert.deepStrictEqual(response, { message: 'Car permanently deleted' });
        });

        it('should return error message when car is not found', async () => {
            const carId = uuidv4();
            const req = {
                params: { id: carId }
            };
            let response;

            carModel.permanentDeleteCarById = async (id) => {
                assert.strictEqual(id, carId);
                return null;
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 404);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.permanentDeleteCarById(req, res);

            assert.deepStrictEqual(response, { error: 'Car not found' });
        });
    });

    describe('softDeleteCarById', () => {
        it('should soft delete the car with the specified id', async () => {
            const carId = uuidv4();
            const req = {
                params: { id: carId }
            };
            let response;

            carModel.softDeleteCarById = async (id) => {
                assert.strictEqual(id, carId);
                return { message: 'Car soft-deleted successfully! It will be permanently deleted within 3 minutes.' };
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 204);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.softDeleteCarById(req, res);

            assert.deepStrictEqual(response, { message: 'Car soft-deleted successfully! It will be permanently deleted within 3 minutes.' });
        });

        it('should return error message when car is not found', async () => {
            const carId = uuidv4();
            const req = {
                params: { id: carId }
            };
            let response;

            carModel.softDeleteCarById = async (id) => {
                assert.strictEqual(id, carId);
                return null;
            };

            const res = {
                status: (statusCode) => {
                    assert.strictEqual(statusCode, 404);
                    return res;
                },
                json: (data) => {
                    response = data;
                }
            };

            await carController.softDeleteCarById(req, res);

            assert.deepStrictEqual(response, { error: 'Car not found' });
        });
    });
});

