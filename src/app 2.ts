import { connect } from "mongoose";
import config from "./config";
import { join } from "path";
import { server } from "@hapi/hapi";
import moment from "moment";
import AppRoute from "./router";

const init = async () => {
  const App = server({
    port: config.port,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  App.route(AppRoute);
  await App.start();
  console.log(
    `App started on:
Date: ${moment(App.info.created).format("Do MMM, yyyy hh:mm:ss a")}
and running on:
Address: ${App.info.uri}`
  );
};
init();
process.on("unhandledRejection", (err) => {
  console.log(err);
  var cmd = "node " + join(__dirname, "dist/app.ts");
  var exec = require("child_process").exec;
  exec(cmd, function () {
    process.kill(1);
  });
});
connect(config.db, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected and running");
  })
  .catch(console.log);