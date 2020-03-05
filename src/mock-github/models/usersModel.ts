import { User } from '../../shared/interfaces/user';
import config from '../../server/config';

class UsersModel {
    getInfoByUsername (): User {
        return { 'avatar_url': config.DEFAULT_AVATAR_URL };
    }
}

export default new UsersModel();
