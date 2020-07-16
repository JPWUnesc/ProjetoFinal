const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Objetivo = require("../models/Objetivo");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    var filter = { usuario: req.userId };
    if (req.query.search) {
      filter.nome = { $regex: ".*" + req.query.search + ".*" };
    }
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    const objetivos = await Objetivo.find(filter)
      .limit(limit)
      .skip(offset)
      .sort(req.query.order);
    var total = await Objetivo.countDocuments(filter);
    return res.send({
      success: true,
      total: total,
      message: "Objetivos listados com sucesso!",
      actualPage:
      limit > 0 && offset > 0
      ? offset / limit
      : 0,
      content: objetivos,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({
        success: false,
        message: "Não foi possivel listas os objetivos.",
      });
  }
});

router.get("/:objetivoId", async (req, res) => {
  try {
    const objetivo = await Objetivo.findById(req.params.objetivoId);

    return res.send({
      success: true,
      message:
        objetivo !== null
          ? "Objetivos encontrado com sucesso!"
          : "Objetivos não localizado!",
      content: objetivo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({
        success: false,
        message: "Não foi possivel encontrar o objetivo.",
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;

    const objetivo = await Objetivo.create({
      ...req.body,
      usuario: req.userId,
    });

    return res.send({
      success: true,
      message: "Objetivo criado com sucesso!",
      content: objetivo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Não foi possivel salvar o objetivo." });
  }
});

router.put("/:objetivoId", async (req, res) => {
  try {
    const { nome } = req.body;

    if (await Objetivo.findOne({ nome, _id: { $ne: req.params.objetivoId }, usuario: req.userId })) {
      return res
        .status(400)
        .send({ success: false, message: "Este nome de objetivo já existe!" });
    }

    const objetivo = await Objetivo.findByIdAndUpdate(
      req.params.objetivoId,
      req.body,
      { new: true }
    );

    return res.send({
      success: true,
      message: "Objetivo alterado com sucesso!",
      content: objetivo,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Não foi possivel salvar o objetivo." });
  }
});

router.delete("/:objetivoId", async (req, res) => {
  try {
    await Objetivo.findByIdAndRemove(req.params.objetivoId);

    return res.send({
      success: true,
      message: "Objetivo removido com sucesso!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = (app) => app.use("/objetivos", router);
