import express from "express";
import path from "path"

const __dirname = path.resolve();
//const PORT = process.env.PORT ?? 4000;
const PORT = 4000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'static')));

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>');
// })

app.listen(PORT, () => {console.log(`Server port ${PORT} ...`);})