### TODO travel-log

* [] Setup Server
   * [] Install Dependecies
   * [] Install /Setup Linter
   * [] Setup express 
   * [] Setup Not Found and Error Middlewares (routes)
* [] Model DB
   * [] What data will we store?
* [] Setup Mongoose model(s)
* [] POST /logs
   * [] Create a new log entry
* [] Create a new log entry
* [] GET /logs
   * List all log entries
* [] Setup Client 
* [] Create Form to add a new entry
* [] Setup Map SDK on Client
* [] List all log entries on map

### Schema
{
title: { type: Number, required: true},
description: String,
comment: String,
image: String,
rating: {type: Number, min: 0, max: 10, default: 0,},
latitude: {...requiredNumber, min: -90, max: 90},
longitude: {...requiredNumber, min: -180, max: 180},
visitDate: {type: Date, required: true},
}, {timestamps: true,}
