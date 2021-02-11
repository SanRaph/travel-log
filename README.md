### TODO travel-log

* [x] Setup Server
   * [x] Install Dependecies
   * [x] Install /Setup Linter
   * [x] Setup express 
   * [x] Setup Not Found and Error Middlewares (routes)
* [x] Model DB
   * [x] What data will we store?
* [x] Setup Mongoose model(s)
* [x] POST /logs
   * [x] Create a new log entry
* [x] Create a new log entry
* [x] GET /logs
   * List all log entries
* [x] Setup Client 
* [x] Create Form to add a new entry
* [x] Setup Map SDK on Client
* [x] List all log entries on map

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
