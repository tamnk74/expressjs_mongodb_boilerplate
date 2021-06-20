import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => res.render('home', { page: 'Home', menuId: 'home' }));

export default router;
