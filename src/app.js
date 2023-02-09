const express = require("express");
const userRouter = require("./route/user.route");
const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.listen(3000, () => {
  console.log("Server listening at port 3000");
});
