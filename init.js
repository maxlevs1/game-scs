"use strict";

if (process.argv.length !== 3) {
	console.log("USE 'node test.js <SAVE_PATH>'");
	process.exit(-1);
}

let fs = require("fs"),
	path = require("path"),
	save_path = __dirname+path.sep+process.argv[2],
	configName = 'config.json',
	config;

const spawn = require('child_process').spawn;

try{
	fs.statSync(save_path);
} catch (e) {
	console.warn(`WARN! Path "${save_path}" not found!`);
	console.log();
	process.exit(-1);
}

let paralel = (funcs, cb) => {
		let compleated = 1, col = funcs.length, kek = cb;
		let uses = () => {
			if (col === compleated){
				kek();
			} else {
				compleated++
			}
		}
		for (let inc = 0; inc < col; inc++){
			funcs[inc](uses);
		}
	},
	doInit = (cb, pr, doing, pPath) => {
		pPath = __dirname+path.sep+pPath;
		try{
			fs.statSync(pPath);
			cb();
		} catch (e) {
			console.log(`Initialization of ${pr.toUpperCase()}`);
			let
			some_proc = spawn(pr, [doing]);
			some_proc.stdout.on('data', (data) => {
				console.log(`Some ${pr.toUpperCase()} init OUTPUT\n ${data}`);
			});

			some_proc.stderr.on('data', (data) => {
				console.log(`Some ${pr.toUpperCase()} init ERROR\n ${data}`);
			});

			some_proc.on('close', (code) => {
				if (!code) {
					console.log(`OK! ${pr.toUpperCase()} has been inited.`);
					cb();
				} else {
					console.log(`WARN! ${pr.toUpperCase()}: Initing error!`);
					process.exit(-1);
				}
			});
		}
	},
	gitInit = (cb) => {
		doInit(cb, 'git', 'init', '.git');
	},
	npmInit = (cb) => {
		doInit(cb, 'npm', 'i', 'node_modules')
	},
	prepare = () => {
		fs.writeFileSync(save_path+path.sep+"some_save_file.lak", "Some saves data!", 'utf8');
		fs.writeFileSync(__dirname+path.sep+'.gitignore', "", 'utf8');
		let
		some_proc = spawn('git', ['add', '.gitignore', 'config.json', save_path]);
		some_proc.stderr.on('data', (data) => {
				console.log(`Some add ERROR\n ${data}`);
			});
		some_proc.on('close', (code) => {
			if (!code) {
				fs.writeFileSync(__dirname+path.sep+'.gitignore', "", 'utf8');
				let
					some_proc = spawn('git', ['commit', '-m', "'Get Started!'"]);
				some_proc.on('close', (code) => {
					if (!code) {
						fs.writeFileSync(__dirname+path.sep+'.gitignore', `/*\n!/.gitignore\n!/config.json\n!/${process.argv[2]}/\n!/${process.argv[2]}/*`, 'utf8');

						//fs.unlinkSync(save_path+path.sep+"some_save_file.lak");
						some_proc = spawn('git', ['add', '.gitignore', save_path]);
						some_proc.stderr.on('data', (data) => {
								console.log(`Some add ERROR\n ${data}`);
							});
						some_proc.on('close', (code) => {
							if (!code) {
								let
								some_proc = spawn('git', ['commit', '-m', "'Activate ignotring needless files!'"]);
								some_proc.on('close', (code) => {
									if (!code) {
										console.log("Preparing compleate!");
										console.log();
										console.log("Pleace...  Короче, жди пока загрузятся модули. Заебался уже на кривом ангельском писать. Теперь буду на лунном - так православнее!");
									} else {
										console.log(`WARN! GIT: Commiting error!`);
										console.log(code);
										process.exit(-1);
									}
								});
							} else {
								console.log(`WARN! GIT: Adding error!`);
								console.log("L!", code);
								process.exit(-1);
							}
						});
					} else {
						console.log(`WARN! GIT: Commiting error!`);
						console.log(code);
						process.exit(-1);
					}
				});
			} else {
				console.log(`WARN! GIT: Adding error!`);
				console.log(code);
				process.exit(-1);
			}
		});
	},
	configInit = () => {
		let confDatas = {
			"path" : process.argv[2],
			"sver" : 0
		};
		fs.writeFileSync(configName, JSON.stringify(confDatas), 'utf8');
		config = fs.readFileSync(configName, 'utf8');
	}

npmInit(()=>{});
configInit();
gitInit(prepare);