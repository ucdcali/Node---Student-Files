// /hello/ route
import { Router } from 'express';

export const router = Router();

// home page route
// render form
router.get('/', (req, res) => {
  res.render('form', {
    title: 'Parse HTTP GET data',
    data: req.query
  });
});