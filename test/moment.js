#!/usr/bin/env node
// import moment from 'moment';
const moment = require('moment');
let format;
format = moment('2023-05-14T18:00:00.000Z', moment.ISO_8601).format('YYYY년 MM월 DD일');
console.log('format = ', format);
format = moment.utc('2023-05-14T18:00:00.000Z').format('YYYY년 MM월 DD일');
console.log('format = ', format);
