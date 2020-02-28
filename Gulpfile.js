const { dest, series, parallel, src } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const testcafe = require('gulp-testcafe');

const paths = {
    BUILD_DIR:   'lib',
    CLIENT_DIR:  'client',
    SERVER_DIR:  'server',
    SHARED_DIR:  'shared',
    TESTS_DIR:   'test',
    MOCK_GITHUB: 'mock-github',
    E2E_TESTS:   'test/e2e'
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
        .pipe(sourcemaps.write())
        .pipe(dest(paths.BUILD_DIR));
}

function transpileShared () {
    return sharedTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(sharedTs()).js
        .pipe(sourcemaps.write())
        .pipe(dest(paths.BUILD_DIR));
}

function transpileClient () {
    return clientTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(clientTs()).js
        .pipe(sourcemaps.write())
        .pipe(dest(paths.BUILD_DIR));
}

function transpileMockGithub () {
    return mockGithubTs
        .src()
        .pipe(sourcemaps.init())
        .pipe(mockGithubTs()).js
        .pipe(sourcemaps.write())
        .pipe(dest(paths.BUILD_DIR));
}

async function clean () {
    await del([paths.BUILD_DIR]);
}

function unitTests () {
    return require('child_process')
        .spawn(
            'npx mocha -r ts-node/register test/unit/**/*-test.*',
            {
                shell: true,
                stdio: 'inherit'
            }
        );
}

function e2eTests () {
    return src(`${paths.E2E_TESTS}/*.js`)
        .pipe(testcafe({ browsers: ['chrome'] }));
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
exports['test'] = series(unitTests, e2eTests);
exports['lint'] = lint;
exports['lint-fix'] = () => lint({ fix: true });
exports['unit'] = unitTests;
exports['e2e'] = e2eTests;
