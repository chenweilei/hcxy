module.exports = function(grunt){

	var mozjpeg = require('imagemin-mozjpeg');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//合并js
		concat: {
			options: {
				// 定义一个用于插入合并输出文件之间的字符
				separator: ';'
			},
			dist: {
				// 将要被合并的文件
				src: ['src/js/*.js'],
				// 合并后的JS文件的存放位置
				dest: 'dist/js/main.js'
			}
		},

		//压缩js
		uglify: {
			options: {
				// 此处定义的banner注释将插入到输出文件的顶部
				banner: '/*! '+'main'+' <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				mangle: true
			},
			dist: {
				files: {
					'dist/js/main.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		//babel
		babel: {
			options: {
				sourceMap: true,
				presets: ['env']
			},
			dist: {
				files: [{
					expand:true,
					cwd:'src/es6', //js目录下
					src: '*.js', //所有js文件
					dest:'src/js'  //输出到此目录下
				}]
			}
		},

		//压缩css
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.css', '!*.min.css'],
					dest: 'dist/css',
					ext: '.min.css'
				}]
			}
		},

		//压缩图片
		imagemin: {                          
			dist: {
				options: {
					optimizationLevel: 1 //定义 PNG 图片优化水平
				},
				files: [
				   {
						expand: true,
						cwd: 'src/images/',
						src: ['**/*.{png,jpg,jpeg}'], // 优化 img 目录下所有 png/jpg/jpeg 图片
						dest: 'dist/images/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
					}
				]
			}
		},

		//压缩html
		htmlmin:{                                    
			options: {                                
				removeComments: true,
				collapseWhitespace: true,
				removeComments: true,
				removeCommentsFromCDATA: true,
				collapseWhitespace: true,
				collapseBooleanAttributes: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeOptionalTags: true				
			},
			html: {
				files: [
					{expand: true, cwd: 'src', src: ['*.html'], dest: 'dist/'}
				]
			}		
		},

		jade: { 
			compile: { 
				options: { 
					data: {} ,
					pretty: true,
					debug: false
				}, 
				files: [
					{ 
						expand: true, 
						cwd: 'src', 
						src: [ '*.jade' ], 
						dest: 'src', 
						ext: '.html' 
					}
				] 
			} 
		},

		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/sass',
					src: '*.sass',
					dest: 'src/css',
					ext: '.css'
				}]
			}
		},

		watch: { 
			sass: { 
				files: 'src/sass/*.sass', 
				tasks: [ 'sass' ]
			},
			bable: {
				files: 'src/es6/*.js', 
				tasks: [ 'babel' ]
			},
			// jade: { 
			// 	files: 'src/**/*.jade', 
			// 	tasks: [ 'jade' ] 
			// }
		},	

		// 拷贝文件到发布目录，这样字体可被反复处理
		// copy: {
		// 	main: {
		// 		src: './test/',
		// 		dest: './src/'
		// 	},
		// },

		//字蛛   此工具只会把页面里面用到该字体的文字变成对应的字体
		'font-spider': {
			options: {},
			main: {
				src: './src/*.html'
			}
		},

	})

	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-font-spider');
	grunt.loadNpmTasks('grunt-contrib-copy');


	// grunt.registerTask('default', [
	// 								// 'concat', 
	// 								'uglify', 
	// 								'cssmin', 
	// 								'imagemin', 
	// 								'htmlmin',
	// 								'jade',
	// 								'sass',
	// 								'watch'
	// 							]
	// 				);

	grunt.registerTask('default', [
									'sass',
									'babel',
									// 'jade',
									//'font-spider',
									//'copy',
									'watch'
								]
					);

}