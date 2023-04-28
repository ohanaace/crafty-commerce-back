import { db } from "../database/database.js";

export async function checkout (req, res) {

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
        if (!products) return res.status(404).send("Não há produtos com esse filtro!")
        return res.status(200).send(products);
    } catch (err){
        return res.status(500).send(err.message);
    }
}

export async function filterProductId (req, res) {
    const {id} = req.params;

    try{
        const product = await db.collection("products").findOne({id: id});
        if (!product) return res.status(404).send("Esse produto não existe")
        return res.status(200).send(product);
    } catch (err){
        return res.status(500).send(err.message);
    }
}