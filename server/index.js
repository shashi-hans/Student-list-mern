let express = require("express");
let cors = require("cors");
let bodyParser = require("body-parser");
const connectDB = require('./config/db');
const createError = require("http-errors");
const app = express();

//  Route
const studentRoute = require("./routes/api/students");

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// cors
app.use(cors({ origin: true, credentials: true }));

// use Routes
app.use("/students", studentRoute);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// 404 Error
app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

// PORT
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
