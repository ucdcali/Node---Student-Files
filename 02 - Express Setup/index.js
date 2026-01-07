import express from 'express';
import compression from 'compression'
const app = express();

app.use(compression());
app.disable('x-powered-by')

import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

// configuration
const __dirname = dirname(fileURLToPath( import.meta.url )) + sep;
const cfg = {
    port: process.env.PORT || 3000,
    dir: {
      root:   __dirname,
      static: __dirname + 'static' + sep,
      views:  __dirname + 'views' + sep
    }
  };

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

// log every request to the terminal
app.use((req, res, next) => {
  console.log(`Navigated to ${req.url}`);
  next();
});

// routes
import { router } from './routes/routes.js';
app.use("/", router);

// serve static assets
app.use(express.static( cfg.dir.static ));

// 404 errors
app.use((req, res) => {
  res.status(404).render('message', { title: 'Not found' });
});

app.listen(3000, () => {
  console.log('Server is live at http://localhost:3000')
})

export default app;
