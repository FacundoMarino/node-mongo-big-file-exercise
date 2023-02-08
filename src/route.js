const express = require("express");
const multer = require("multer");
const { upload, list } = require("./controller");

const router = express.Router();

const uploadFile = multer({
  //Defino lugar de almacenamiento
  storage: multer.diskStorage({
    destination: "./_temp",

    //Defino nombre de archivo para que no se suban dos archivos con el mismo nombre

    filename: (req, file, cb) => {
      cb("", `${Date.now()}-${file.originalname}`);
    },
  }),

  //Hago filtro de archivos para que solo se puedan subir tipos de archivo, si se desean más se pueden sumar a un array ej ["text/txt", "text/csv", "image/png"]

  fileFilter: (req, file, cb) => {
    file.mimetype === "text/csv"
      ? cb(null, true)
      : cb(new Error("Error de tipo de archivo"), false);
  },

  //Limito tamaño del archivo para que solo se puedan subir hasta una cantidad maxima.

  limits: {
    fileSize: 80000000,
  },
});

router.post("/upload", uploadFile.single("file"), upload);
router.get("/records", list);

module.exports = router;
