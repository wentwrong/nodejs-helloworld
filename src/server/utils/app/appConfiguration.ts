/**
 * Object passed as a param to the constructor of `ConfiguratedExpress`
 *
 * @export
 * @interface AppConfigurationAsParam
 */
export interface AppConfigurationAsParam {
    port?: string | number;
    host?: string;
    routesDir?: string;
}


/**
 * Object passed as a param to the constructor of `Server`
 *
 * @export
 * @interface AppConfiguration
 */
export interface AppConfiguration {
    port: string | number;
    host: string;
    routesDir: string;
}
