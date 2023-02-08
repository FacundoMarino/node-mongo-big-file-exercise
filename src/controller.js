const Records = require("./records.model");
const csvtojson = require("csvtojson");

const upload = async (req, res) => {
  const { file } = req;

  try {
    //Convierto archivo csv en json con librería csvtojson
    await csvtojson()
      .fromFile(file.path) // ubicación del archivo
      .then((csvData) => {
        Records.insertMany(csvData).then(() => {
          //uso la data del json para enviarla en el schema a mongodb
          res.json({
            ok: true,
            msg: "El archivo se ha subido correctamente",
          });
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
      msg: "Error al subir el archivo",
    });
  }
};

const list = async (_, res) => {
  try {
    const data = await Records.find({}).limit(10).lean();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  upload,
  list,
};
