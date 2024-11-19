import express from "express";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use("api/v1/user", userRoute);

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}`);
});
