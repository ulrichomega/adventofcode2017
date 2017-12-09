//Because this is js, and not ts we use es importing
// Note: Too many <letter><s> languages

//Created with referenes to http://www.typescriptlang.org/docs/handbook/gulp.html (20170226)
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");
var changedInPlace = require("gulp-changed-in-place");

var output = "dist";

function changedSrc(tsProject) {
    return tsProject.src().pipe(changedInPlace({firstPass: true, howToDetermineDifference: "modification-time"}));
}

gulp.task("tslintChanged", function() {
    return changedSrc(tsProject).pipe(tslint()).pipe(tslint.report());
});

gulp.task("tslint", function() {
    return tsProject.src().pipe(tslint()).pipe(tslint.report());
});

gulp.task("buildChanged", ["tslintChanged"], function() {
    return changedSrc(tsProject).pipe(tsProject()).js.pipe(gulp.dest(output));
});

gulp.task("build", ["tslint"], function() {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest(output));
});

gulp.task("watch", function() {
    gulp.watch("*.ts",["buildChanged"]);
});

gulp.task("default", ["tslint", "build"], function() {
    
});