const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[environment];

// Due to the issue of node-pg package queries returning DATE datatypes in locale strings (and thus
// possibly resulting in different dates for clients in different timezones), this is the workaround, using
// https://github.com/brianc/node-pg-types/blob/master/lib/textParsers.js#L128
const types = require('pg').types;
const moment = require('moment');
types.setTypeParser(1082, str => moment.utc(str).format());

module.exports = require('knex')(config);