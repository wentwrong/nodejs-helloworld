import ConfiguratedExpress from '../server/configuratedExpress';
import { AppConfigurationAsParam } from '../server/utils/app/appConfiguration';

export default class MockGithubApp extends ConfiguratedExpress {
    constructor (conf?: AppConfigurationAsParam) {
        super(conf);
    }
}
