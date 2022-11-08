import express from 'express';

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
    res.json({ data: 'hello world' })
})

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})