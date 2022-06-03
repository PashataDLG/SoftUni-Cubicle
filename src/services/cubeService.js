const fs = require('fs/promises');
const path = require('path');

// const cubes = require('../db.json');
const Cube = require('../models/Cube');

exports.getAll = async (search = '', fromInput, toInput) => {
    const from = Number(fromInput) || 0;
    const to = Number(toInput) || 6;

    // const result = cubes
    //     .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
    //     .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);

    let cubes = await Cube.find({ name: { $regex: new RegExp(search, 'i') } })
        .where('difficultyLevel').lte(to).gte(from)
        .lean();

    return cubes;
}

exports.getOne = (cubeId) => Cube.findById(cubeId);

exports.create = (cube) => Cube.create(cube);