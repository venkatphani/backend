const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
const compression = require("compression");
const createLogger = require("@lionellbriones/logging").default;
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes");

const app = express();
dotenv.config();
const databaseConfig = require("./database");

const corsOptions = {
  origin: "*",
  credentials: false,
};

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

const log = createLogger("index.js");

const { host, port: mongoPort, user, password, database } = databaseConfig;
const username = encodeURIComponent(user);
const mongoPassword = encodeURIComponent(password);
const mongoDatabase = encodeURIComponent(database);

let url = `${host}:${mongoPort}/${mongoDatabase}`;
if (username) {
  url = `${username}:${mongoPassword}@${url}`;
}

url = `mongodb://${url}`;

connectionMongo();

let counter = 0;

mongoose.connection.on("error", (error) => {
  if (error) log.error(error);
  if (counter < 50) setTimeout(connectionMongo, 5000);
  counter += 1;
});

const port = process.env.PORT || 2020;
app.listen(port, () => log.info(`Server running on port: ${port}`));

function connectionMongo() {
  mongoose
    .connect(url, {
      autoIndex: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info("mongo db connection - success");
      app.emit("dbConnected");
    })
    .catch((error) => log.error(error, "mongoose connection failed"));
}
