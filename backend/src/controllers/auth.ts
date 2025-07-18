import {getFirestore} from 'firebase-admin/firestore';
import {Router} from 'express';

const db = getFirestore()
const router =  Router()


router.get('/signup', async(req, res) =>{
    
})

export default router;
