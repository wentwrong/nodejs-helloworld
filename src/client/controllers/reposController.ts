import debugFactory from '../../shared/debugFactory';
import errorRegister from '../../shared/errorRegister';

const debug = debugFactory('repos-controller');

export default class ReposController {
    static async getSlug (): Promise<string> {
        try {
            const endpointUrl = 'api/v1/repos/slug';
            const response = await fetch(endpointUrl);

            debug.log(`Endpoint ${endpointUrl} answer with response`);
            debug.log(response);

            if (response.status !== 200)
                throw new Error(`Endpoint ${endpointUrl} answer with HTTP status code ${response.status}`);

            const { slug } = await response.json();

            return slug;
        }
        catch (err) {
            debug.error('Error occured when fetching slug data');
            debug.error(err);

            await errorRegister(err.stack);

            return '';
        }
    }
}
