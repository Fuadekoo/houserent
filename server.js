require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); // Import cors
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware'); // Updated package name
const Backend = require('i18next-fs-backend');

const app = express();

// Initialize i18next
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: './locales/{{lng}}/translation.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'am'], // Languages to preload
    saveMissing: true,
    detection: {
      order: ['querystring', 'cookie', 'header'],
      caches: ['cookie']
    },
    whitelist: ['en', 'am'], // List of allowed languages
    checkWhitelist: true // Enable whitelist check
  });

// Use i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// this is used if the backend and front end is use different port make safe
app.use(cors());
const dbconfig = require("./config/dbconfig");
const port = process.env.PORT || 5000;
app.use(express.json());

// this is used for gate usersModel
const usersRoute = require("./routes/usersRoute");
// this is used for gate house Model 
const houseRoute = require("./routes/houseRoute");
// this is used for gate transaction Model
const transactionRoute = require("./routes/transactionRoute");
// this is used for booking Model
const bookingRoute = require("./routes/bookingroute");
// this is used for withdraw Model
const withdrawalRoute = require("./routes/withdrawalRoute");

// this is used for dashboard Model
const dashboardRoute = require("./routes/dashboardRoute");

// this is used for api
app.use("/api/users", usersRoute);
app.use("/api/property", houseRoute);
app.use("/api/transaction", transactionRoute);
app.use("/api/bookRoom", bookingRoute);
app.use("/api/withdrawal", withdrawalRoute);
app.use("/api/dashboard", dashboardRoute);

// this is used fo run server
app.listen(port, () => { console.log(`listen on port ${port}`) });