'use strict';

const { Nuxt } = require('nuxt-start');

const config = require('./nuxt.config.js');
config.dev = false;
const nuxt = new Nuxt(config);

exports.main = (event, context) => {
  return new Promise((resolve, reject) => {
    context.callbackWaitsForEmptyEventLoop = false;

    nuxt.renderRoute('/')
      .then(result => resolve({
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: result.html
      }))
      .catch(reject);
  });
};
