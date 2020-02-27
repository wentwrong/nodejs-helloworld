import express from 'express';
import debugFactory from '../../shared/debugFactory';

const debug = debugFactory('client-errors-register');

export default class ErrorRegisterController {
    static async add (req: express.Request, res: express.Response): Promise<void> {
        debug.log('Error on client-side:');
        debug.log(req.body);
        res.send({ message: 'Error has been registered' });
    }
}
