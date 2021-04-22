const { Router } = require('express');
const {
  getCourseRequests,
  getCourseRequest,
  createCourseRequest,
  updateCourseRequest,
  deleteCourseRequest,
} = require('../controllers/courseRequestController');

const router = Router();

router.get('/', getCourseRequests);

router.get('/:id', getCourseRequest);

router.post('/', createCourseRequest);

router.put('/:id', updateCourseRequest);

router.delete('/:id', deleteCourseRequest);

module.exports = router;
