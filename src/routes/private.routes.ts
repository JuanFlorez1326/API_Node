import { Router } from "express";
import passport from "passport";

const router = Router();

router.get('/message', passport.authenticate('jwt', {session: false}), (req, res) => {
   res.send('Message Page') 
});

export default router;