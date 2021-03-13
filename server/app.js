const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDB = require('./config/db')
const cors = require('cors')



const auth = require("./routes/auth");
const mentions = require("./routes/mentions");
const settings = require("./routes/settings");
const userData = require("./routes/userData");
 
//connect to mongodb
connectDB();
const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors({credentials: true, origin: ['http://localhost:3000','http://localhost:3001']}))



app.use("/", auth );
app.use("/", mentions );
app.use("/", settings );
app.use("/", userData );
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
