import express from 'express';
import { User } from '../../shared/interfaces/user';
import usersModel from '../models/usersModel';

export default class MockUsersController {
    async infoByUsername (req: express.Request, res: express.Response): Promise<void> {
        const userInfo: User = usersModel
            .getInfoByUsername();

        res.json(userInfo);
    }
}
