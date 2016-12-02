/*jshint esversion: 6*/

const 
	fs = require('fs');
	gulp = require("gulp"),
	git  = require("gulp-git"),
	gaze = require('gaze');

let
	configName = 'config.json',
	config;

global.tKey;

//functions
let timer = (fun, ms, trKey) => {
		if (trKey) {
			clearTimeout(trKey);
		}
		return setTimeout(fun, ms);
};

let checking = (cb, type) => {
	git.status({args: '--porcelain'}, (err, stdout) => {
		if(stdout){
			cb();
		}
	});
};

let saving = () => {
	//Update config.path
	var mes = "Save #" + (++config.sver);
	fs.writeFileSync(configName, JSON.stringify(config));
	console.log("=================");
	console.log("     SAVING!     ");
	console.log("=================");
	gulp.src('./')
		.pipe(git.add())
		.pipe(git.commit(mes));
};

let restoring = () => {
	console.log("==================");
	console.log("    RESTORING!    ");
	console.log("==================");
	git.reset('HEAD', {args:'--hard'});
};

let save = () => {
	checking(saving, 0);
};

let restore = () => {
	//console.log("L!", global.tKey);
	global.tKey = timer(() => {
		checking(restoring, 1)
	}, 10, global.tKey);
};

config = JSON.parse(fs.readFileSync(configName, 'utf8'));

const
	save_path_name = config.path,
	save_path_direct = save_path_name+'/**/*';

gulp.task('watch', function (cb) {
	gaze(save_path_direct, (err, watcher) => {
		console.log("Ok!", "Watching '", config.path, "'");
		console.log("=================");
		console.log("|     START     |");
		console.log("=================");
		console.log();

		watcher.on('ready',  (watcher) => {
			console.log('Ready!')
		});

		watcher.on('changed',	save);
		watcher.on('added',		save);
		watcher.on('deleted',	restore);
	});

	cb();
});

gulp.task('default', ['watch']);