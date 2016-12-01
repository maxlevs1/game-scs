/*jshint esversion: 6*/

const 
	fs = require('fs');
	gulp = require("gulp"),
	git  = require("gulp-git"),
	Gazes = require('gaze'),
	async = require('async');

let
	incr = 1,
	configName = 'config.json',
	config;

applyConf = () => {
	config = JSON.parse(fs.readFileSync(configName, 'utf8'));
};

try{
	applyConf();
} catch (e) { 
	let confDatas = {
		"path" : "saves",
		"sver" : 0
	};
	fs.writeFileSync(configName, JSON.stringify(confDatas));
	applyConf();
}

const
	save_path_name = config.path,
	save_path_direct = save_path_name+'/**/*',
	save_watcher = new Gazes(save_path_direct);

gulp.task('watch', function (cb) {
	save_watcher.on('ready', function(watcher) {
		console.log('Ready!!')
	});
	save_watcher.on('all', function(event, filepath) {
		console.log(event, filepath);
		switch (event) {
			case 'changed': 
				var 
				text = fs.readFileSync(configName, 'utf8');
				text = JSON.parse(text);
				var mes = "Save #" + (++text.sver);
				text = JSON.stringify(text);
				fs.writeFileSync(configName, text);
				return gulp.src('./'+save_path_direct)
					.pipe(git.add())
					.pipe(git.commit(mes));
				break;
			case 'deleted':
				return git.reset('HEAD', {args:'--hard'});
				break;
			default :;
		}
	});
	cb();
});

gulp.task('default', ['watch']);