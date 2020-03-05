import debugFactory from '../../shared/debugFactory';
import errorRegister from '../../shared/errorRegister';
import { Slug } from '../../shared/interfaces/slug';

const debug = debugFactory('repos-controller');

export default class ReposController {
    static async getSlugs (): Promise<Slug[]> {
        try {
            const endpointUrl = 'api/v1/repos/slugs';
            const response = await fetch(endpointUrl);

            debug.log(`Endpoint ${endpointUrl} answer with response`);
            debug.log(response);

            if (response.status !== 200)
                throw new Error(`Endpoint ${endpointUrl} answer with HTTP status code ${response.status}`);

            const { slugs } = await response.json();

            return slugs;
        }
        catch (err) {
            debug.error('Error occured when fetching slug data');
            debug.error(err);

            await errorRegister(err.stack);

            return [];
        }
    }
}
