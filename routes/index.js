// ./routes/index.js
import contacts from "./contact.js";
// import photos from './photos.js'

const mountRoutes = (app) => {
  app.use("/contact", contacts);
  // app.use('/photos', photos)
  // etc..
};

export default mountRoutes;
