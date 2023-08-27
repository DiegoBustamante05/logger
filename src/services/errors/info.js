export const generateProductErrorInfo = (product) => {
    return `
One or more properties are incomplete or invalid!!!
List of required properties:
          * title: Must be a string. (${product.title})
          * description:: Must be a string. (${product.description})
          * price: Must be a number. (${product.price})    
          * code: Must be a string. (${product.code})
          * stock: Must be a number. (${product.stock})
          * category: Must be a string. (${product.category})
          * status: Must be a boolean. (${product.category})
    `;
};

export const generateUpdateProductErrorInfo = (product) => {
    return `
One or more properties are incomplete or invalid!!!
List of required properties:
          * title: Must be a string. (${product.title})
          * description:: Must be a string. (${product.description})
          * price: Must be a number. (${product.price})    
          * code: Must be a string. (${product.code})
          * stock: Must be a number. (${product.stock})
          * category: Must be a string. (${product.category})
          * status: Must be a boolean. (${product.category})
          * id: must be a string. (${product.id})
    `;
};