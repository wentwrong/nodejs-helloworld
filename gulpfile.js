const { dest, src, series, parallel } = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');

const paths = {
    BUILD_DIR:  'dist',
    CLIENT_DIR: 'src/client/public',
    TESTS_DIR:  'test'
};

const serverTs = ts.createProject('tsconfig.json');
const clientTs = ts.createProject(`${paths.CLIENT_DIR}/tsconfig.json`);

function transpileServer () {
    return serverTs.src()
        .pipe(serverTs())
        .js.pipe(dest(paths.BUILD_DIR));
}

function transpileClient () {
    return clientTs.src()
        .pipe(clientTs())
        .js.pipe(dest(`${paths.BUILD_DIR}/src/client/public`));
}

function copyhtml () {
    return src([`${paths.CLIENT_DIR}/*.html`])
        .pipe(dest(`${paths.BUILD_DIR}/${paths.CLIENT_DIR}`));
}

function copyfixtures () {
    return src([`${paths.TESTS_DIR}/fixtures/*.json`])
        .pipe(dest(`${paths.BUILD_DIR}/${paths.TESTS_DIR}/fixtures`));
}

function test () {
    return src(`${paths.BUILD_DIR}/${paths.TESTS_DIR}/**/*-test.js`, { read: false })
        .pipe(mocha({
            reporter: 'list',
            exit:     true
        }));
}

async function clean () {
    await del([paths.BUILD_DIR]);
}

const buildServer = parallel(copyfixtures, transpileServer);
const buildClient = parallel(copyhtml, transpileClient);

exports.clean = clean;
exports.test = test;
exports.build = series(clean, parallel(buildServer, buildClient));
