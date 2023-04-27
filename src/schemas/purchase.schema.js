import joi from "joi";

export const checkoutSchema = joi.object({
    
})

// recebe do front: {products: [{id: , type: , quantity: , price: (back pesquisa no banco)}, {}, {}], payment: }
// back manda: {name: , subtotal: , payment: }