const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
  const server = express();

  server.get('/view/:id', (req, res) => {
    const queryParams = { movieId: req.param('id') };
    app.render(req, res, '/view', queryParams);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send({ title: 'Unauthorized', detail: 'Unauthorized Access!' });
    }
  });

  const PORT = process.env.PORT || 3000;

  server.use(handle).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on port ${ PORT}`);
  });
})
.catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
