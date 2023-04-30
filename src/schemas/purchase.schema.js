import joi from "joi";

export const addProductCartSchema = joi.object({
    productId: joi.string().required(),
  quantity: joi.number().integer().min(1).required(),
});

export const modifyProductQuantitySchema = joi.object({
  productId: joi.string().required(),
  quantity: joi.number().integer().min(1).required(),
});

export const deleteProductCartSchema = joi.object({
  productId: joi.string().required(),
});

const itemsSchema = joi.object({
    productId: joi.string().required(),
});
const quantitySchema = joi.object({
    productId: joi.string().required(),
    quantity: joi.number().min(1).integer().required()
});
export const checkoutSchema = joi.array().items(itemsSchema, quantitySchema);
// recebe do front: {products: [{id: , type: , quantity: , price: (back pesquisa no banco)}, {}, {}], payment: }
// back manda: {name: , subtotal: , payment: }
