import { Router } from 'express';

const router = Router();

router.get('/healthcheck', (req, res) => res.send('OK'));
router.get('/', (req, res) => res.render('home', {page:'Home', menuId:'home'}));
router.get('/cli', (req, res) => res.render('cli'));

export default router;