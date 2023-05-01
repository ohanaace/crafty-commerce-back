
import { db } from "../database/database.js";
import { ObjectId } from "mongodb";

export async function checkout(req, res) {
    // na página do carrinho de compras quando o usuário clicar no botão finalizar compra
    const { payment, subtotal} = req.body;
    const token = res.locals.token;

    try {
        const user = await db.collection("sessions").findOne({ token });
        const cart = await db.collection("cart").findOne({userId: user.userId});
        delete cart._id;
        await db.collection("checkout").insertOne({...cart, payment, subtotal});
        return res.sendStatus(200);

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function orderSummary (req, res){
    const token = res.locals.token;

    try {
        const user = await db.collection("sessions").findOne({ token });
        const cart = await db.collection("cart").findOne({ userId: user.userId });  
        res.status(200).send(cart);
        await db.collection("cart").deleteOne({ userId: user.userId }); // deletar cart pós entrar em /checkout

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteCart (req, res){
    const token = res.locals.token;

    try {
        const user = await db.collection("sessions").findOne({ token });
        const cart = await db.collection("cart").findOne({ userId: user.userId });
        if (!cart) return res.status(404).send("Esse usuário ainda não tem carrinho");
        await db.collection("cart").deleteOne({ userId: user.userId });
        return res.status(200).send("O carrinho do usuário foi deletado.")

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function productsList(req, res) {
    try {
        const products = await db.collection("products").find().toArray();
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function filterProductsType(req, res) {
    const { type } = req.params;

    try {
        const products = await db.collection("products").find({ type: type }).toArray();
        if (products.length === 0) return res.status(404).send("Não há produtos com esse filtro!")
        return res.status(200).send(products);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function filterProductId(req, res) {
    const { id } = req.params;

    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        if (!product) return res.status(404).send("Esse produto não existe");
        return res.status(200).send(product);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function cartProductsList(req, res) {
    try {
        const user = res.locals.user;
        const prods = await db.collection("cart").findOne({ userId: user._id });
        if(!prods) res.status(404).send("O usuário não possui produtos no carrinho!")
        return res.status(200).send(prods.products);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function addProductCart(req, res) {
    const { id } = req.params;
    const { quantity } = req.body;
    const user = res.locals.user;
    console.log(user)

    try {
        const product = await db.collection("cart").aggregate([
            { $match: { userId: user._id } },
            { $unwind: "$products" },
            { $match: { "products._id": new ObjectId(id) } },
            { $project: { product: "$products" } }
        ]).toArray();
        console.log(product)
        if (product.length === 0){
            const newProduct = await db.collection("products").findOne({_id: new ObjectId(id)});
            const completeProduct = {...newProduct, quantity};
            const prods = await db.collection("cart").findOne({ userId: user._id });
            if (!prods) {
                const products = [completeProduct];
                await db.collection("cart").insertOne({ products, userId: user._id });
            } else {
                const editedProducts = [...prods.products, completeProduct];
                await db.collection("cart").updateOne({ userId: user._id }, { $set: { products: editedProducts} });
            }

            return res.status(200).send("Produtos adicionados no carrinho com sucesso")
        }
        if (product.length !== 0){
            await db.collection("cart").updateOne(
                { userId: user._id, "products._id": new ObjectId(id) },
                { $inc: { "products.$.quantity": 1 } }
             );
            return res.status(200).send("Quantidade de produto adicionada com sucesso");
        }
        
    } catch (err) {

        return res.status(500).send(err.message);
    }

}

export async function modifyProductQuantity(req, res) {
    const { type, id } = req.params;
    const token = res.locals.token;

    try {
        const user = await db.collection("sessions").findOne({ token });
        if (type === "plus") {
            await db.collection("cart").updateOne(
                { userId: user.userId, "products._id": new ObjectId(id) },
                { $inc: { "products.$.quantity": 1 } }
             );
            return res.status(200).send("Quantidade de produto adicionada com sucesso");
        }
        if (type === "minus") {
            const product = await db.collection("cart").aggregate([
                { $match: { userId: user.userId } },
                { $unwind: "$products" },
                { $match: { "products._id": new ObjectId(id) } },
                { $project: { product: "$products" } }
            ]).toArray();

            if (product[0].product.quantity === 1){
                await db.collection("cart").updateOne(
                    { userId: user.userId },
                    { $pull: { products: { _id:  new ObjectId(id)} } }
                );
                return res.status(200).send("Produto deletado com sucesso");
            }
            
            await db.collection("cart").updateOne(
                { userId: user.userId, "products._id": new ObjectId(id) },
                { $inc: { "products.$.quantity": -1 } }
             );
            return res.status(200).send("Quantidade de produto diminuída com sucesso");
        }

    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export async function deleteProductCart(req, res) {
    // na página do carrinho de compras
    const { id } = req.params;
    const token = res.locals.token;

    try {
        const user = await db.collection("sessions").findOne({ token });
        const prods = await db.collection("cart").findOne({ userId: user.userId });
        if (!prods) return res.sendStatus(404);
        const update = await db.collection("cart").updateOne(
            { userId: user.userId },
            { $pull: { products: { _id:  new ObjectId(id)} } }
        );
        if (update.modifiedCount !== 0) {
            return res.status(200).send("Produto deletado com sucesso")
        } else {
            return res.status(404).send("O produto não foi encontrado na lista de produtos do carrinho do usuário")
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
}