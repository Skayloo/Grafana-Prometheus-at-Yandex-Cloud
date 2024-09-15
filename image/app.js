const express = require('express');
const promClient = require('prom-client');
const app = express();
const port = 8080;

// Create a Registry to register the metrics
const register = new promClient.Registry();

// Create a Counter metric
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  registers: [register],
});

// Create a Counter metric for errors
const errorCounter = new promClient.Counter({
  name: 'http_errors_total',
  help: 'Total number of HTTP errors',
  labelNames: ['method', 'route', 'code'],
  registers: [register],
});

// Middleware to record request duration
app.use((req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.route ? req.route.path : 'unknown', code: res.statusCode });
  });
  next();
});

// Middleware to count errors
app.use((err, req, res, next) => {
  if (res.statusCode >= 400) {
    errorCounter.inc({ method: req.method, route: req.route ? req.route.path : 'unknown', code: res.statusCode });
  }
  next(err);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/error', (req, res) => res.status(500).send('Server Error!'));
app.get('/badrequest', (req, res) => res.status(400).send('Bad Request!'));

// Endpoint for Prometheus to scrape metrics
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
