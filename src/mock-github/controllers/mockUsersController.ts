import express from 'express';
import { User } from '../../shared/interfaces/user';
import usersModel from '../models/UsersModel';

export default class MockUsersController {
    static async infoByUsername (req: express.Request, res: express.Response): Promise<void> {
        const userInfo: User = usersModel
            .getInfoByUsername();

        res.json(userInfo);
    }
}
