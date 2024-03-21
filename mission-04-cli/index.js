const mongoose = require('mongoose');
const Car = require('./models/Car');

mongoose.Promise = global.Promise;

// Connect to mongoDB
mongoose.connect('mongodb://localhost:27017/mission-ready');

// Add Car
const addCar = async (car) => {
    try {
        const newCar = await Car.create(car);
        console.info('New Car Added:', newCar);
    } catch (error) {
        console.error('Error adding car:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Find Car
const findCar = async (name) => {
    // Make case insensitive
    const search = new RegExp(name, 'i');
    try {
        const cars = await Car.find({ $or: [{ model: search }, { colour: search }] });
        console.info(cars);
        console.info(`${cars.length} matches`);
    } catch (error) {
        console.error('Error finding car:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Update Car
const updateCar = async (_id, car) => {
    try {
        const updatedCar = await Car.findOneAndUpdate({ _id }, car, { new: true });
        console.info('Car Updated:', updatedCar);
    } catch (error) {
        console.error('Error updating car:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Remove Car
const removeCar = async (_id) => {
    try {
        const removedCar = await Car.findOneAndDelete({ _id });
        if (removedCar) {
            console.info('Car Removed:', removedCar);
        } else {
            console.info('Car not found');
        }
    } catch (error) {
        console.error('Error removing car:', error);
    } finally {
        mongoose.connection.close();
    }
}

// List Cars
const listCars = async () => {
    try {
        const cars = await Car.find();
        console.info(cars);
        console.info(`${cars.length} cars`);
    } catch (error) {
        console.error('Error listing cars:', error);
    } finally {
        mongoose.connection.close();
    }
}

// Export All Methods
module.exports = {
    addCar,
    findCar,
    updateCar,
    removeCar,
    listCars
}