const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");

const app = express();
const PORT = 5000;

// Import Routers

const rolesRouter = require("./routes/roles");
const userRouter = require("./routes/users");
const clinkRouter = require("./routes/clinic");
const doctorRouter = require("./routes/doctor.js");
const diginosticRouter = require("./routes/diagnostics.js");
const specializationRouter = require("./routes/specialization");
const rateRouter = require("./routes/ratings.js");
const appointmentRouter = require("./routes/appointment.js");
const contactUsRouter = require("./routes/contactUs.js");
const adminRouter = require("./routes/admin.js");

app.use(express.json());
app.use(cors());

// Routes Middleware

// app.use("/users",userRouter)
app.use("/roles", rolesRouter);
app.use("/users", userRouter);
app.use("/clinic", clinkRouter);
app.use("/doctor", doctorRouter);
app.use("/diagnostics", diginosticRouter);
app.use("/specialization", specializationRouter);
app.use("/ratings", rateRouter);
app.use("/appointment", appointmentRouter);
app.use("/contactUs", contactUsRouter);
app.use("/admin", adminRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

//Test
//mohammed
