import { Router } from 'express';
import { signUp, signIn } from "../controllers/user.controller";
import { 
    createMessage, 
    getAllMessage, 
    getMessagesByUserId, 
    updateMessage, 
    deleteMessage 
} from "../controllers/message.controller"

const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

router.post('/message', createMessage);
router.get('/message', getAllMessage);
router.get('/message/:idUser', getMessagesByUserId);
router.put('/message/:id', updateMessage);
router.delete('/message/:id', deleteMessage);

export default router;