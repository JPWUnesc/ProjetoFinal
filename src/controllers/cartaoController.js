const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const Cartao = require("../models/Cartao");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    var filter = { usuario: req.userId };
    if (req.query.nome) {
      filter.nome = { $regex: ".*" + req.query.nome + ".*" };
    }
    var limit = parseInt(req.query.limit);
    var offset = parseInt(req.query.offset);
    const cartoes = await Cartao.find(filter)
      .limit(limit)
      .skip(offset);

    return res.send({
      success: true,
      total: await Cartao.countDocuments(filter),
      message: "Cartões listados com sucesso!",
      actualPage: limit
        ? limit /
          (offset == 0 ? limit : offset)
        : 1,
      content: cartoes,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Não foi possivel listas os cartoes." });
  }
});

router.get("/:cartaoId", async (req, res) => {
  try {
    const cartao = await Cartao.findById(req.params.cartaoId);

    return res.send({
      success: true,
      message:
        cartao !== null
          ? "Cartões encontrado com sucesso!"
          : "Cartões não localizado!",
      content: cartao,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({
        success: false,
        message: "Não foi possivel encontrar o cartão.",
      });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome } = req.body;

    if (await Cartao.findOne({ nome, usuario: req.userId })) {
      return res
        .status(400)
        .send({ success: false, message: "Este cartão já existe!" });
    }

    if (
      req.body.modalidade === undefined ||
      (req.body.modalidade !== "DEBITO" && req.body.modalidade != "CREDITO")
    ) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Modalidade deve ser informada corretamente!",
        });
    }

    const cartao = await Cartao.create({ ...req.body, usuario: req.userId });

    return res.send({
      success: true,
      message: "Cartão criado com sucesso!",
      content: cartao,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Não foi possivel salvar o cartão." });
  }
});

router.put("/:cartaoId", async (req, res) => {
  try {
    const { nome } = req.body;

    if (await Cartao.findOne({ nome, _id: { $ne: req.params.cartaoId }, usuario: req.userId })) {
      return res
        .status(400)
        .send({ success: false, message: "Este nome de cartão já existe!" });
    }

    if (
      req.body.modalidade !== undefined &&
      req.body.modalidade !== "DEBITO" &&
      req.body.modalidade != "CREDITO"
    ) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Modalidade deve ser informada corretamente!",
        });
    }

    const cartao = await Cartao.findByIdAndUpdate(
      req.params.cartaoId,
      req.body,
      { new: true }
    );

    return res.send({
      success: true,
      message: "Cartão alterado com sucesso!",
      content: cartao,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ success: false, message: "Não foi possivel salvar o cartão." });
  }
});

router.delete("/:cartaoId", async (req, res) => {
  try {
    await Cartao.findByIdAndRemove(req.params.cartaoId);

    return res.send({
      success: true,
      message: "Caertão removido com sucesso!",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = (app) => app.use("/cartoes", router);
