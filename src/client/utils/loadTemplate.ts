import debugFactory from '../../shared/debugFactory';
import config from '../../shared/sharedConfig';

const debug = debugFactory('template-loader');

export default async function loadTemplate (templateName: string): Promise<string> {
    try {
        const response: Response = await fetch(`${config.TEMPLATES_DIR}/${templateName}.${config.TEMPLATES_EXT}`);

        if (response.status === 404) {
            throw new Error(
                `Template "${config.TEMPLATES_DIR}/${templateName}.${config.TEMPLATES_EXT}" was not found`
            );
        }

        return await response.text();
    }
    catch (err) {
        debug.error(`Error occured when loading template ${templateName}`);
        debug.error(err);

        throw err;
    }
}
