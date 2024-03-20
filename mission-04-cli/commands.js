#!/usr/bin/env node

const { Command } = require('commander');
const { prompt } = require('inquirer');
const { addCar, findCar, updateCar, removeCar, listCars } = require('./index.js'); 

// Car Questions
const questions = [
    {
        type: 'input',
        name: 'model',
        message: 'Car Model Name'
    },
    {
        type: 'input',
        name: 'year',
        message: 'Car Year'
    },
    {
        type: 'input',
        name: 'colour',
        message: 'Car Colour'
    },
];

const program = new Command();
program.version('1.0.0').description('Client Management System');

// Add Car
program
    .command('add')
    .alias('a')
    .description('Add a car')
    .action(() => {
        prompt(questions).then(answers => addCar(answers));
    });

// Find Car
program
    .command('find <name>')
    .alias('f')
    .description('Find a car')
    .action(name => findCar(name));

// Update Car
program
    .command('update <_id>')
    .alias('u')
    .description('Update a car')
    .action((_id) => {
        prompt(questions).then(answers => updateCar(_id, answers));
    });

// Remove Car
program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a car')
    .action(_id => removeCar(_id));

// List Cars
program
    .command('list')
    .alias('l')
    .description('List all cars')
    .action(() => {
        listCars();
    });

    
program.parse(process.argv);