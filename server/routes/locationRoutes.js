const { Router } = require('express');
const { authenticateByToken } = require('../middlewares/tokenAuth');
const {
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationController');

const router = Router();

router.get('/', authenticateByToken, getLocations);

router.get('/:id', getLocation);

router.post('/', createLocation);

router.put('/:id', updateLocation);

router.delete('/:id', deleteLocation);

module.exports = router;
