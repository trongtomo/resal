'use strict';

/**
 * dropdown controller
 */

module.exports = {
  async categoriesWithTags(ctx) {
    try {
      // Get all categories
      const categories = await strapi.entityService.findMany('api::category-product.category-product', {
        fields: ['name', 'slug']
      });

      // Get all products with their categories and tags
      const products = await strapi.entityService.findMany('api::product.product', {
        fields: ['id'],
        populate: {
          category_products: {
            fields: ['slug']
          },
          tags: {
            fields: ['name', 'slug']
          }
        }
      });

      // Group tags by category
      const categoriesWithTags = {};
      
      // Initialize all categories
      categories.forEach(category => {
        categoriesWithTags[category.slug] = {
          name: category.name,
          tags: []
        };
      });

      // Add tags to categories based on products
      products.forEach(product => {
        if (product.category_products && product.tags) {
          product.category_products.forEach(category => {
            if (categoriesWithTags[category.slug]) {
              product.tags.forEach(tag => {
                // Check if tag already exists
                const tagExists = categoriesWithTags[category.slug].tags.some(
                  existingTag => existingTag.slug === tag.slug
                );
                if (!tagExists) {
                  categoriesWithTags[category.slug].tags.push({
                    name: tag.name,
                    slug: tag.slug
                  });
                }
              });
            }
          });
        }
      });

      ctx.body = {
        data: categoriesWithTags
      };
    } catch (error) {
      console.error('Error fetching categories with tags:', error);
      ctx.throw(500, 'Error fetching categories with tags');
    }
  }
};