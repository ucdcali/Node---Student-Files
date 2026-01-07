// /hello/ route
import { Router } from 'express';
import { hello } from '../lib/locale.js';
import { capitalize } from '../lib/string.js';

export const router = Router();

// home page route
router.get('/', (req, res) => {
  res.render('message', { title: 'Hello World!' });
});

// say hello in English
router.get('/hello/:name', (req, res, next) => {
  res.render(
    'message',
    { title: `${ hello.en } ${ capitalize( req.params.name ) }!` }
  );
});

// say hello in a specific language
router.get('/hello/:lang/:name', (req, res, next) => {
  res.render(
    'message',
    { title: `${ hello[req.params.lang] || hello.en } ${ capitalize( req.params.name ) }!` }
  );
});

// return a value for a user
router.get('/author/:name/book/:bookName', (req, res) => {
  const author = req.params.name;
  const book = req.params.bookName;
  res.render('message', { title: `Hi ${author}, author of '${book}'!` });
});