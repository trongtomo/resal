'use strict';

/**
 * dropdown router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/dropdown/categories-with-tags',
      handler: 'dropdown.categoriesWithTags',
      config: {
        auth: false, // Make endpoint public
        policies: [],
        middlewares: [],
      },
    },
  ],
};