import multer from "multer";
//importamos multer, es una libreria que te permite enviar archivos de parte del cliente que no sean JSON al servidor, por ejemplo Imagenes, Videos, pdfs, excels, etc. crearemos la variable para poder usar la libreria (el objeto va a dedicar la ubicacion donde estaran los archivos)
const upload = multer({ dest: "upload/" });

export { upload };
