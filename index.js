const http = require('http');
const createHandler = require('github-webhook-handler');

const handler = createHandler({ path: '/webhook', secret: 'myhashsecret' });

http
  .createServer((req, res) => {
    handler(req, res, () => {
      res.statusCode = 404;
      res.end('Not Found');
    });
  })
  .listen(7777);

handler.on('error', err => {
  console.error(err);
});

handler.on('push', event => {
  console.log('PUSH EVENT');
  console.log(JSON.stringify(event, null, 2));
});
