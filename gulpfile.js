const del = require('del');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');

const paths = {
    BUILD_DIR:  'dist',
    CLIENT_DIR: 'src/client/public',
    TESTS_DIR:  'test'
};

const serverTs = ts.createProject('tsconfig.json');
const clientTs = ts.createProject(`${paths.CLIENT_DIR}/tsconfig.json`);

gulp.task('transpile-server', () => {
    return serverTs.src()
        .pipe(serverTs())
        .js.pipe(gulp.dest(paths.BUILD_DIR));
});

gulp.task('transpile-client', () => {
    return clientTs.src()
        .pipe(clientTs())
        .js.pipe(gulp.dest(`${paths.BUILD_DIR}/src/client/public`));
});

gulp.task('copy-html', () => {
    return gulp.src([`${paths.CLIENT_DIR}/*.html`])
        .pipe(gulp.dest(`${paths.BUILD_DIR}/${paths.CLIENT_DIR}`));
});

gulp.task('copy-fixtures', () => {
    return gulp.src([`${paths.TESTS_DIR}/fixtures/*.json`])
        .pipe(gulp.dest(`${paths.BUILD_DIR}/${paths.TESTS_DIR}/fixtures`));
});

gulp.task('test', () => {
    return gulp.src(`${paths.BUILD_DIR}/${paths.TESTS_DIR}/**/*-test.js`, { read: false })
        .pipe(mocha({
            reporter: 'list',
            exit:     true
        }));
});

gulp.task('clean', async () => {
    await del(['dist']);
});

gulp.task('build-client', gulp.series('copy-html', 'transpile-client'));
gulp.task('build-server', gulp.series('copy-fixtures', 'transpile-server'));

gulp.task('build',
    gulp.series(
        'clean',
        'build-server',
        'build-client'
    )
);
