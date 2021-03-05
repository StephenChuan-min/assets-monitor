const { series, task } = require('gulp');
const watch = require('gulp-watch');
const browserSync = require('browser-sync');

task('watchFun', () => {
	console.log('watchFun');
	browserSync.reload();
});
task('browserSyncFun', () => {
	browserSync.init({
		server: {
			baseDir: './template/result',
		},
	});

	watch(['template/src/**/*.css', 'template/result/**/*.js'], series(['watchFun']));
	watch('src/index.html', series(['watchFun']));
});

exports.default = series('browserSyncFun');
