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
    return tsProject.src().pipe(changedInPlace());
}

gulp.task("tslint", function() {
    return changedSrc(tsProject).pipe(tslint()).pipe(tslint.report());
});

gulp.task("build", ["tslint"], function() {
    return changedSrc(tsProject).pipe(tsProject()).js.pipe(gulp.dest(output));
});

gulp.task("watch", function() {
    gulp.watch("*.ts",["default"]);
});

gulp.task("default", ["tslint", "build"], function() {
    
});