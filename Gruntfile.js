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
				'../mattwhi.github.io/*',
				'!../mattwhi.github.io/.git*'
				]
			}],
			options: {
				force:true,
			}	
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
				src: [
					'{,*/}*.html',
					'!dist/{,*/}*.html'
				],
				dest: '../mattwhi.github.io/'
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
				  dest: '../mattwhi.github.io/',
				  ext: '.min.css'
				}]

		}
	};
	config['jshint'] = {
		concat: {
			dist: {
			src: ['./js/{,*/}*.js'],
			dest: '../mattwhi.github.io/js/myJavaScript.js',
				}
			},
		jshint: {
			beforeconcat: ['./js/{,*/}*.js'],
    		afterconcat: ['../mattwhi.github.io/js/myJavaScript.js']
		}
	};
	config['uglify'] = {
		concat: {
			options: {
				mangle: false,
				beutify: true
				},
			files: {
			'../mattwhi.github.io/js/myJavaScriptjQuery.js' : ['./js/{,*/}*.js'],
			'js/myJavaScriptjQuery.js' : ['./js/{,*/}*.js']
			}
		}
	};
	//config['uglify'] = {
		//concat: {
			//options: {
				//mangle: false,
				//beutify: true
				//},
			//files: {
			//'../mattwhi.github.io/js/myJavaScriptBeutifyjQuery.js' : ['./js/{,*/}*.js']
			//}
		//}
	//};
	//Copy over any new images to the distribution folder
	config['copy'] = {
		dist: {
			files: [{
				expand: true,
				dot: true,
				cwd: './',
				dest: '../mattwhi.github.io/',
				src: [
					'./img/{,*/}*.png',
					'./img/{,*/}*.jpg'
				]
				}]	
		}
	};
	config['useminPrepare'] = {
		options: {
			dest: '../mattwhi.github.io/',
			},
			html: './index.html'
		};
	
	config['usemin'] = {
		options: {
			dirs: ['../mattwhi.github.io/'],
			},
			html: ['../mattwhi.github.io/{,*/}*.html']
		};
	
	config['rev'] = {
		files: {
			src: [
				'../mattwhi.github.io/scripts/{,*/}*.js',	
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
	'jshint',
	'uglify',
	'rev',
	'compass',
	'copy',
	'usemin'
	];

    grunt.registerTask('build', tasks);
};
