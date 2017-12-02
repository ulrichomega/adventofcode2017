//Because this is js, and not ts we use es importing
// Note: Too many <letter><s> languages

//Created with referenes to http://www.typescriptlang.org/docs/handbook/gulp.html (20170226)
var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");

gulp.task("tslint", function() {
    return tsProject.src().pipe(tslint()).pipe(tslint.report());
});

gulp.task("build", ["tslint"], function() {
    //what is this doing?
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist"));
});

gulp.task("default", ["tslint", "build"], function() {
    
});