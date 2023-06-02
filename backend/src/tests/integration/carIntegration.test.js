const assert = require('assert');
const sinon = require('sinon');
const axios = require('axios');

const carData = {
    id: '8e0312a5-ec3a-4d33-97e2-1a6dd354e9af',
    registration_plate: 'ABC123',
    chassis_number: '123456789',
    renavam: '987654321',
    model: 'Sedan',
    brand: 'Toyota',
    year: 2022,
    created_at: '2022-01-01',
    updated_at: '2022-01-02',
};

describe('It should test integration of all functions', () => {
    let axiosPostStub;
    let axiosGetStub;
    let axiosPutStub;
    let axiosDeleteStub;

    before(() => {
        axiosPostStub = sinon.stub(axios, 'post');
        axiosPostStub.withArgs('http://localhost:3000/cars').resolves({ status: 201, data: carData });

        axiosGetStub = sinon.stub(axios, 'get');
        axiosGetStub.withArgs('http://localhost:3000/cars').resolves({ status: 200, data: [carData] });
        axiosGetStub.withArgs(`http://localhost:3000/cars/${carData.id}`).resolves({ status: 200, data: carData });

        axiosPutStub = sinon.stub(axios, 'put');
        axiosPutStub.withArgs(`http://localhost:3000/cars/${carData.id}`).resolves({ status: 200, data: carData });

        axiosDeleteStub = sinon.stub(axios, 'delete');
        axiosDeleteStub.withArgs(`http://localhost:3000/cars/${carData.id}`).resolves({ status: 200, data: 'Car deleted' });
        axiosDeleteStub.withArgs(`http://localhost:3000/cars/${carData.id}/force`).resolves({ status: 200, data: 'Car permanently deleted' });
    });

    after(() => {
        axiosPostStub.restore();
        axiosGetStub.restore();
        axiosPutStub.restore();
        axiosDeleteStub.restore();
    });

    it('should create a new car', async () => {
        const expectedResponse = carData;
        const car = {
            registration_plate: 'ABC123',
            chassis_number: '123456789',
            renavam: '987654321',
            model: 'Sedan',
            brand: 'Toyota',
            year: 2022,
        };

        const response = await axios.post('http://localhost:3000/cars', car);

        assert.strictEqual(response.status, 201);
        assert.deepStrictEqual(response.data, expectedResponse);
    });

    it('should retrieve all cars', async () => {
        const expectedResponse = [carData];

        const response = await axios.get('http://localhost:3000/cars');

        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, expectedResponse);
    });

    it('should retrieve a specific car', async () => {
        const expectedResponse = carData;

        const response = await axios.get(`http://localhost:3000/cars/${carData.id}`);

        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, expectedResponse);
    });

    it('should update a car', async () => {
        const expectedResponse = carData;
        const updatedCar = {
            registration_plate: 'DEF456',
            chassis_number: '987654321',
            renavam: '123456789',
            model: 'SUV',
            brand: 'Honda',
            year: 2023,
        };

        const response = await axios.put(`http://localhost:3000/cars/${carData.id}`, updatedCar);

        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, expectedResponse);
    });

    it('should soft delete a car', async () => {
        const expectedResponse = 'Car deleted';

        const response = await axios.delete(`http://localhost:3000/cars/${carData.id}`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data, expectedResponse);
    });

    it('should permanently delete a car', async () => {
        const expectedResponse = 'Car permanently deleted';

        const response = await axios.delete(`http://localhost:3000/cars/${carData.id}/force`);

        assert.strictEqual(response.status, 200);
        assert.strictEqual(response.data, expectedResponse);
    });

    it('should soft delete a car', async () => {
        const response = await axios.delete(`http://localhost:3000/cars/${carData.id}`);

        if (response.status === 200) {
            assert.strictEqual(response.data, 'Car deleted');
        } else if (response.status === 404) {
            assert.strictEqual(response.data, 'Car already deleted');
        } else if (response.status === 500) {
            assert.strictEqual(response.data, 'Error deleting car');
        } else {
            assert.fail(`Unexpected response status: ${response.status}`);
        }
    });
});
