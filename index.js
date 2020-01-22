
const server = require('./server');

const port = process.env.PORT || 4000;

server.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});

// Notes from Jason's code.

// server.listen(port, () => {
//     console.log(`\n** Running on http://localhost:${port} **\n`)
// })