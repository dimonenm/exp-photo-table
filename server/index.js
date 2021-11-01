import express from "express";

const PORT = process.env.PORT ?? 4000;
const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.listen(PORT, () => {console.log(`Server port ${PORT} ...`);})