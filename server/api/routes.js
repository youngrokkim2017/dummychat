import { Router } from 'express';

import Room from '../models/Rooms';

const router = new Router();

router.get('/rooms', async (req, res) => {
    const rooms = await Room.find();
    res.json({ rooms });
});

export default router;