const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const cors = require('cors');
const app = express();
const PORT = 5714;

app.use(cors({
  origin: '*'
}));

const upload = multer();

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image uploaded.");
  }

  const imageBuffer = req.file.buffer;
  const pythonProcess = spawn("python3", ["python_file.py"], {
    stdio: ["pipe", "pipe", process.stderr],
  });
   
   

     pythonProcess.stdin.write(imageBuffer);
     pythonProcess.stdin.end();

     let result = "";

     pythonProcess.stdout.on("data", (data) => {
       console.log(data.toString());
       result += data.toString();
       console.log(result)

     });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    // Send the result along with the response
    console.log(result);
    res.status(200).json({
      result,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});