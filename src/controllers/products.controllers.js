import { ObjectId } from "bson";
import { db } from "../database/database.js";

export async function checkout (req, res) {
    // na página do carrinho de compras quando o usuário clicar no botão finalizar compra
    const {products} = req.body;
    const token = res.locals.token;
    
    try {
        
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function productsList (req, res) {
    try {
        const products = await db.collection("products").find().toArray();
        return res.status(200).send(products);
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function filterProductsType (req, res) {
    const {type} = req.params;

    try{
        const products = await db.collection("products").find({type: type}).toArray();
        if (products.length === 0) return res.status(404).send("Não há produtos com esse filtro!")
        return res.status(200).send(products);
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function filterProductId (req, res) {
    const {id} = req.params;

    try{
        const product = await db.collection("products").findOne({_id: new ObjectId(id)});
        if (!product) return res.status(404).send("Esse produto não existe")
        return res.status(200).send(product);
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function cartProductsList (req, res){
    try{
        const prods = await db.collection("cart").findOne({userId: user._id});
        return res.status(200).send(prods.products);
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function addProductCart (req, res){
    // na página de descrição de um produto
    const {product} = req.body;
    const token = res.locals.token;
    console.log(token);
    // product = {name, description, price, quantity, type, id}
    // products = [{name, description, price, quantity, type, id}, ...]
    
    try {
        
        const user = await db.collection("users").findOne({token});
        const prods = await db.collection("cart").findOne({userId: user._id});
        if (!prods) {
            const products = [product];
            await db.collection("cart").insertOne({products, userId: user._id});
        } else {
            const editedProducts = [...prods.products, product];
            const editedCart = {products: editedProducts, userId: user._id};
            await db.collection("cart").updateOne({userId: user._id}, {$set: editedCart});
        }
        
        return res.status(200).send("Produtos adicionados no carrinho com sucesso")
    } catch (err){
        return res.status(500).send(err.message);
    }

}

export async function modifyProductQuantity (req, res){
    const {type} = req.params;
    const {product} = req.body;
    const token = res.locals.token;
    const productId = product._id;

    try{
        const user = await db.collection("users").findOne({token});
        const prods = await db.collection("cart").findOne({userId: user._id});
        if (type === "plus"){
            product.quantity = product.quantity++;
            const newProductsArray = prods.filter((obj) => obj.products.id !== productId);
            const finalProductsArray = [...newProductsArray, product];
            await db.collection("cart").updateOne({userId: user._id}, {$set: {userId: user._id, products: finalProductsArray}});
            return res.status(200).send("Quantidade de produto adicionada com sucesso");
        }
        if (type === "minus"){
            product.quantity = product.quantity--;
            const newProductsArray = prods.filter((obj) => obj.products.id !== productId);
            const finalProductsArray = [...newProductsArray, product];
            await db.collection("cart").updateOne({userId: user._id}, {$set: {userId: user._id, products: finalProductsArray}});
            return res.status(200).send("Quantidade de produto diminuída com sucesso"); 
        }
        
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function deleteProductCart (req, res){
    // na página do carrinho de compras
    const {product} = req.body;
    const token = res.locals.token;
    const id = product._id;

    try {
        const user = await db.collection("users").findOne({token});
        const prods = await db.collection("cart").findOne({userId: user._id});
        if (!prods) return res.sendStatus(404);
        const newProductsArray = prods.filter((obj) => obj.products.id !== id);
        await db.collection("cart").updateOne({userId: user._id}, {$set: {userId: user._id, products: newProductsArray}});
        return res.status(200).send("Produto deletado com sucesso")
    } catch (err){
        return res.status(500).send(err.message);
    }
}