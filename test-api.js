const qs = require('qs');

const query = {
  pagination: {
    page: 1,
    pageSize: 12
  },
  populate: {
    image: true,
    tags: {
      fields: ['name', 'slug']
    },
    category_products: {
      fields: ['name', 'slug']
    },
    brand: {
      fields: ['name', 'slug']
    }
  },
  filters: {
    category_products: {
      slug: {
        $eq: 'sneaker'
      }
    }
  }
};

console.log('With encodeValuesOnly: true, allowDots: true');
console.log(qs.stringify(query, { 
  encodeValuesOnly: true,
  addQueryPrefix: false,
  allowDots: true
}));

console.log('\nWith encodeValuesOnly: false');
console.log(qs.stringify(query, { 
  encodeValuesOnly: false,
  addQueryPrefix: false
}));
