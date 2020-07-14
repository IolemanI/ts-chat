import { Request, Response, Router } from 'express';
import { OK } from 'http-status-codes';

import { paramMissingError } from '@shared/constants';

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

// Init shared
const router = Router();


/******************************************************************************
 *                      Login - "GET /public/login"
 ******************************************************************************/

router.get('/login', async (req: Request, res: Response) => {
    const name = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });

    return res.status(OK).json({ name });
});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
