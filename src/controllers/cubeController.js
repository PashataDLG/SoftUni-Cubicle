const router = require('express').Router();

const cubeService = require('../services/cubeService');

router.get('/create', (req, res) => {
    res.render('create');
});

router.post('/create', async (req, res) => {
    const cube = req.body;

    // Validate
    if (cube.name.length < 2) {
        return res.status(400).send('Invalid request');
    }

    // Save data
    try {
        await cubeService.create(cube);

        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/details/:id', async function (req, res) {
    const cube = await cubeService.getOneDetailed(req.params.id).lean();

    res.render('details', { cube });
});

router.get('/:cubeId/edit', async function (req, res) {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    if(!cube){
        return res.redirect('/404');
    }

    res.render('edit', { cube });
});

router.post('/:cubeId/edit', async function (req, res) {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);

    res.redirect(`/cube/details/${modifiedCube._id}`);
});

module.exports = router;
