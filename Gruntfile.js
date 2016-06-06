module.exports = function(grunt) {
  grunt.config.init({
    uglify: {
      build: {
        files: {
          'build/ace-editor-wrapper.min.js': 'dist/ace-editor-wrapper.js',
          'build/ace-markdown-plus.min.js': 'dist/ace-markdown-plus.js',
          // 'build/ace-editor.min.js': 'node_modules/ace-builds/src-min/*.js',
          'build/ace.min.js': 'node_modules/ace-builds/src-min-noconflict/ace.js',
          'build/snippets.min.js': 'node_modules/ace-builds/src-min-noconflict/snippets/*.js',
          'build/mode-markdown.min.js': 'node_modules/ace-builds/src-min-noconflict/mode-markdown.js',
          'build/themes.min.js': 'node_modules/ace-builds/src-min-noconflict/theme-*.js',
        }
      }
    },
    watch: {
      uglify: {
        files: ['dist/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      }
    },
    connect: {
      server: {
        options: {
          protocol: 'http',
          hostname: '*',
          port: 8000,
          base: '.'
        }
      }
    },
    karma: {
      min: {
        configFile: 'test/karma-min.config.coffee'
      },
      source: {
        configFile: 'test/karma.config.coffee'
      }
    }
  });
  grunt.registerTask('dev', ['connect', 'watch']);
  grunt.registerTask('build', ['uglify']);
  grunt.registerTask('test', ['karma']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  return grunt.loadNpmTasks('grunt-contrib-uglify');
};
