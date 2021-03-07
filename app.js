const express = require('express');
async function startServer() {
    const app = express();
    await require('./loaders')({ app });
    let port = 3000;
    app.listen(port, () => {
        console.log(`🛡️  Server listening on port: ${port} 🛡️`);
    }).on('error', (err) => {
        console.log(err);
    });
}

startServer();
