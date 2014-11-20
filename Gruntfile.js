'use strict';

module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var config = {};
	//Clean the distribution folder
	config['clean'] = {
		build: {
			files: [{
				dot:true,
				src: [
				'./dist/*',
				'!dist/.git*'
				]
			}]	
		}
	};
	//Clean the html file and send to distribution folder
	config['htmlmin'] = {
		dist: {
			options: {
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true	
			},
			files: [{
				expand: true,
				cwd: './',
				src: '{,*/}*.html',
				dest: './dist'
				}]
		}
	};
	//minify the css and send to distribution folder
	config['cssmin'] = {
		dist: {
			files: 
				[{
				  expand: true,
				  cwd: './',
				  src: ['./css/{,*/}*.css'],
				  dest: './dist/',
				  ext: '.min.css'
				}]

		}
	};
	config['uglify'] = {
		options: {
			mangle: false,
			},
	};
	//Copy over any new images to the distribution folder
	config['copy'] = {
		dist: {
			files: [{
				expand: true,
				dot: true,
				cwd: './',
				dest: './dist',
				src: [
					'./img/{,*/}*.png',
					'./img/{,*/}*.jpg'
				]
				}]	
		}
	};
	config['useminPrepare'] = {
		options: {
			dest: 'dist',
			},
			html: './index.html'
		};
	
	config['usemin'] = {
		options: {
			dirs: ['./dist'],
			},
			html: ['./dist/{,*/}*.html']
		};
	
	config['rev'] = {
		files: {
			src: [
				'./dist/scripts/{,*/}*.js',	
				]
			}
		};
	config['compass'] = {
		options: {
			sassDir: './scss',
			cssDir: './css',
			relativeAssets: false
		},
		dist: {},
		server: {}
	};
	
	config['watch'] = {
		options: {
			nospawn: true
				},
				compass: {
					files:['./scss/{,*/}*.{scss,sass}'],
					tasks:['compass:server']	
				}
	};
	
    grunt.initConfig(config);
	
    var tasks = [
	'clean',
	'useminPrepare',
	'htmlmin',
	'cssmin',
	'uglify',
	'rev',
	'compass',
	'copy',
	'usemin'
	];

    grunt.registerTask('build', tasks);
};
