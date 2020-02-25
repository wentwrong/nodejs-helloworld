export interface AppConfigurationAsParam {
    port?: string | number;
    host?: string;
    routesDir?: string;
}

export interface AppConfiguration {
    port: string | number;
    host: string;
    routesDir: string;
}
