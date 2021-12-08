import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";

import https from 'https';

// https.get('https://www.listal.com/natalia-gryglewska/pictures', (resp) => {
//   let data = '';

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     data += chunk;
//     // console.log(data);
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     fs.writeFile('./listal.html', data, (err) => {
//       if (err) throw error; // если возникла ошибка
//       console.log("Сохранение файла на диск прошло успешно");
//     });
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });

// console.log(process.pid);
// console.log(process.env);


const __dirname = path.resolve();
//const PORT = process.env.PORT ?? 4000;
const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));

app.get('/app-get-settings', (req, res) => {
    fs.readFile('./db/appSettings.json', 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading file from disk: ${err}`);
        } else {
            res.send(data);
        }
    });
})

app.post('/app-set-settings', (req, res) => {

    if (!req.body) return res.send('error no data');

    const data = JSON.stringify(req.body);
    res.send('Сохранение прошло успешно');

    fs.writeFile('./db/appSettings.json', data, (err) => {
        if (err) throw error; // если возникла ошибка
        console.log("Сохранение файла на диск прошло успешно");
    });
})

app.listen(PORT, () => { console.log(`Server port ${PORT} ...`); })