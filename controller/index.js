// ./routes/index.js
import contacts from "./contact.js";
// import photos from './photos.js'

const mountRoutes = (app) => {
  app.use("/contact/v1", contacts);
  // app.use('/photos', photos)
  // etc..
};

export default mountRoutes;
