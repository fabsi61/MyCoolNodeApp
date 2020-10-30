//dotenv ganz oben
require("dotenv").config();
const server = require("./api/server");
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`***running on port ${port}***`);
});

{message: "Hallo geht das"}