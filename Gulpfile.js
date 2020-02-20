const { dest, series, parallel } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

const paths = {
    BUILD_DIR:  'lib',
    CLIENT_DIR: 'client',
    TESTS_DIR:  'test'
};

const serverTs = ts.createProject('tsconfig.json');
const clientTs = ts.createProject(`src/${paths.CLIENT_DIR}/tsconfig.json`);

function transpileServer () {
    return serverTs.src()
        .pipe(serverTs())
        .js.pipe(dest(`${paths.BUILD_DIR}`));
}

function transpileClient () {
    return clientTs.src()
        .pipe(clientTs())
        .js.pipe(dest(`${paths.BUILD_DIR}/client`));
}

async function clean () {
    await del([paths.BUILD_DIR]);
}

function mocha () {
    return require('child_process')
        .spawn(
            'npx mocha -r ts-node/register test/**/*-test.*',
            {
                shell: true,
                stdio: 'inherit'
            }
        );
}

function lint ({ fix = false } = {}) {
    return require('child_process')
        .spawn(
            `npx eslint src test *.js ${fix ? '--fix' : ''} --ext .js,.ts`,
            {
                shell: true,
                stdio: 'inherit'
            }
        );
}

const buildServer = transpileServer;
const buildClient = transpileClient;

exports['clean'] = clean;
exports['build'] = series(clean, parallel(buildServer, buildClient));
exports['test'] = mocha;
exports['lint'] = lint;
exports['lint-fix'] = () => lint({ fix: true });
