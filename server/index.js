import express from "express";
import cors from "cors";
import fs from 'fs';

// import path from "path";

// const express = require('express');
// const cors = require('cors');

// const __dirname = path.resolve();
//const PORT = process.env.PORT ?? 4000;
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/app-get-settings', (req, res) => {
  fs.readFile('./db/appSettings.json', 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`);
    } else {
      const settings = JSON.parse(data);
      res.send(JSON.stringify(settings));
    }
  });  
})

app.post('/app-set-settings', (req, res) => {

  if (!req.body) return res.send('error no data');

  const data = JSON.stringify(req.body);
  res.send('запись файла завершена');
  console.log(data);

  fs.writeFile('./db/appSettings2.json', data, (err) => {
    if (err) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
  });
})



app.listen(PORT, () => { console.log(`Server port ${PORT} ...`); })