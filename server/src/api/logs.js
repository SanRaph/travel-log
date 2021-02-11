const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

router.get( '/', async (req, res, next) => {
    try {
       const entries = await LogEntry.find();
       res.json(entries);
    } catch (error) {
        next(error);
    }
});



router.post( '/', async (req, res, next) => {
  try {
      const logEntry = new LogEntry(req.body);
      const createdEntry =  await logEntry.save();
      res.json(createdEntry);
      
      if(Error.name === 'ValidationError'){
          res.status(422);
          console.log(createdEntry);
      }

  } catch (error) {
      next(error);
  }
});

module.exports = router;