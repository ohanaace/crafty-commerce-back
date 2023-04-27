import { db } from "../database/database.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function logIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection("users").findOne({ email });
        if (!user) return res.status(404).send("Email não cadastrado.");
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("Senha incorreta.");

        const token = uuid();
        const info = { name: user.name, token };
        await db.collection("sessions").insertOne({ userId: user._id, token });
        res.send(info);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export async function signUp(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await db.collection("users").findOne({ email });
      if (user) return res.status(409).send("Usuario já existente.");
      const hashedpw = bcrypt.hashSync(password, 10);
      const info = { name, email, password: hashedpw };
  
      await db.collection("users").insertOne(info);
      return res.status(201).send("User criado com sucesso!");
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
};