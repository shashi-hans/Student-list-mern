const express = require('express');
const router = express.Router();

// Student Model
let studentSchema = require('../../models/Student');

// ADD Student
router.post('/add-student',(req, res, next) => {
  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      console.log('Student profile created successfully !')
      res.json(data)
    }
  })
});

// Students List
router.get('/',(req, res, next) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Student Profile for Edit
router.get('/edit-student/:id',(req, res, next) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Student
router.put('/update-student/:id',(req, res, next) => {
  studentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      console.log(error)
      return next(error);
    } else {
      res.json(data)
      console.log('Student details updated successfully !')
    }
  })
})

// Delete Student
router.delete('/delete-student/:id',(req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
      console.log('Student Profile deleted successfully !')
    }
  })
})

module.exports = router;