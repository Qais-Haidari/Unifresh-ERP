const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const path = require("path");
const Helmet = require("helmet");
const App = Express();
const PORT = 5000;
const morgan = require("morgan");
const hpp = require("hpp");

// MIDDLE WARES
App.use(Express.json());
App.use(Express.urlencoded({ extended: false }));
App.use(Helmet());
App.use(Cors("*"));
App.use(morgan("tiny"));
App.use(hpp());

// ADD & REGISTER ROUTES
App.use("/", require("./Routes/Get"));
App.use("/", require("./Routes/Delete"));
App.use("/", require("./Routes/Post"));
App.use("/", require("./Routes/Update"));

App.listen(PORT, console.log(`SERVER START AT ${PORT}`));
