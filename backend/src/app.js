require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/auth", require("./routes/auth.routes"));
app.use("/customer", require("./routes/customer.routes"));
app.use("/admin", require("./routes/admin.routes"));
app.use("/kurir", require("./routes/kurir.routes"));
app.use("/outlet", require("./routes/outlet.routes"));
app.use("/layanan", require("./routes/layanan.routes"));
app.use("/transaksi", require("./routes/transaksi.routes"));

// ─── Error Handler ────────────────────────────────────────────────────────────

app.use(require("./middleware/errorHandler"));

module.exports = app;
