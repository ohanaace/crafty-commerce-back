import joi from "joi";

export const cartSchema = joi.object({
  quantity: joi.number().integer().min(1).required()
});

export const checkoutSchema = joi.object({
    payment: joi.string().valid("Cartão de Crédito", "Cartão de Débito", "Pix", "Boleto Bancário").required(),
    subtotal: joi.number().required()
});

