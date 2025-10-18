const express = require('express');
const request = require('request');
const app = express();

// Webshare proxy credentials
const proxyUser = 'rkvqtvbg';
const proxyPass = '4lrrccln1vxi';
const proxyHost = 'proxy.webshare.io';
const proxyPort = '6837';

const WEBSHARE_PROXY = `http://${proxyUser}:${proxyPass}@${proxyHost}:${proxyPort}`;

// Relay all requests to PeteZahGames through Webshare proxy
app.use('/', (req, res) => {
  const targetUrl = `https://petezahgames.github.io${req.url}`;
  req.pipe(request({ url: targetUrl, proxy: WEBSHARE_PROXY })).pipe(res);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
