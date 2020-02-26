const { dest, series, parallel } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    BUILD_DIR:   'lib',
    CLIENT_DIR:  'client',
    SERVER_DIR:  'server',
    SHARED_DIR:  'shared',
    TESTS_DIR:   'test',
    MOCK_GITHUB: 'mock-github'
};

const serverTs = ts.createProject(`src/${paths.SERVER_DIR}/tsconfig.json`);
const clientTs = ts.createProject(`src/${paths.CLIENT_DIR}/tsconfig.json`);
const sharedTs = ts.createProject(`src/${paths.SHARED_DIR}/tsconfig.json`);
const mockGithubTs = ts.createProject(`src/${paths.MOCK_GITHUB}/tsconfig.json`);

function transpileServer () {
    return serverTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(serverTs()).js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${paths.BUILD_DIR}/server`));
}

function transpileShared () {
    return sharedTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(sharedTs()).js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${paths.BUILD_DIR}/shared`));
}

function transpileClient () {
    return clientTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(clientTs()).js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${paths.BUILD_DIR}/client`));
}

function transpileMockGithub () {
    return mockGithubTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(mockGithubTs()).js
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`${paths.BUILD_DIR}/mock-github`));
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
            `npx eslint src test Gulpfile.js ${fix ? '--fix' : ''} --ext .js,.ts`,
            {
                shell: true,
                stdio: 'inherit'
            }
        );
}

const buildServer = transpileServer;
const buildClient = transpileClient;
const buildShared = transpileShared;
const buildMockGithub = transpileMockGithub;

exports['clean'] = clean;
exports['build'] = series(clean, parallel(buildServer, buildClient, buildShared, buildMockGithub));
exports['test'] = mocha;
exports['lint'] = lint;
exports['lint-fix'] = () => lint({ fix: true });
