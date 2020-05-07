const gulp = require("gulp");
const clean = require("gulp-clean");
const ts = require("gulp-typescript");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("scripts",  ['static'],() => {
  const tsResult = tsProject.src().pipe(tsProject());

  tsResult.js.pipe(gulp.dest("dist"));
});


gulp.task('static', ['clean'], () => {
    return gulp.src(['src/**/*.json'])
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src('disc').pipe(clean());
});

gulp.task('build', ['scripts']);

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json',], ['build'])
});

gulp.task('default', ['watch']);