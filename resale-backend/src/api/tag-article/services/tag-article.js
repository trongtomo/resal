'use strict';

/**
 * tag-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tag-article.tag-article');
