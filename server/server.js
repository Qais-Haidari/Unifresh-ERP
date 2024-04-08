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


Mongoose.connect("mongodb://127.0.0.1:27017/orders", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then((res) => console.log(`DB CONNECTED`))
  .catch((err) => console.log(`ERROR : ${err}`));

// ADD & REGISTER ROUTES
App.use("/", require("./Routes/Get"));
App.use("/", require("./Routes/Delete"));
App.use("/", require("./Routes/Post"));
App.use("/", require("./Routes/Update"));

// Dominos Routes
App.use("/Dominos", require("./Routes/Dominos/Get"));
App.use("/", require("./Routes/Dominos/Post"));

// Web Routes
App.use("/Web", require("./Routes/Web/Get"));
// App.use("/", require("./Routes/Dominos/Post"));

// Auth
App.use("/Auth", require("./Routes/Auth/Get"));

// ONLINE ORDERING
App.use("/onlineOrdering", require("./Routes/OnlineOrdering/Get"));
App.use("/onlineOrdering", require("./Routes/Dominos/Post"));

App.use("/onlineOrdering/web/", require("./Routes/OnlineOrdering/post"));

// Users
App.use("/Users", require("./Routes/Users/Get"));
App.use("/Tests", require("./Routes/Test"));

// OSTENDO ROUTES
App.use("/Ostendo", require("./Routes/Ostendo/Get"));
App.use("/Ostendo", require("./Routes/Ostendo/Post"));

App.use("/KFC", require("./Routes/KFC/KFC_Festival"));

App.listen(PORT, console.log(`SERVER START AT ${PORT}`));
