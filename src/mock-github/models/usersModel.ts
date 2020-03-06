import { User } from '../../shared/interfaces/user';
import { DEFAULT_CONFIG } from '../../server/config';

class UsersModel {
    getInfoByUsername (): User {
        return { 'avatar_url': DEFAULT_CONFIG.defaultGithubAvatarURL };
    }
}

export default new UsersModel();
