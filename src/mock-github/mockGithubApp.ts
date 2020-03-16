import ConfiguratedExpress from '../server/configuratedExpress';
import { Config } from '../server/config';

export default class MockGithubApp extends ConfiguratedExpress {
    constructor (conf?: Partial<Config>) {
        super(conf);
    }
}
