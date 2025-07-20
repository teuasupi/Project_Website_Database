import { Router, Request, Response } from 'express';
import user from './user';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'Masuk nih' });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

router.use('/user', user);

export default router;
