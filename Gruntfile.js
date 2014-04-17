/*global module:false, es5:true*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-s3');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    s3: {
      options: {
        bucket: 'cdn-embed-ly',
        access: 'public-read',
        headers: {
          //"Cache-Control": "max-age=43200, public"
          "Cache-Control": "max-age=300, public"
        }
      },
      release: {
        upload: [
          {
            src: 'dist/player-<%= pkg.version %>.js',
            dest: 'player-<%= pkg.version %>.js'
          },
          {
            src: 'dist/player-<%= pkg.version %>.min.js',
            dest: 'player-<%= pkg.version %>.min.js'
          }
       ]
      }
    },
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
      },
      release: {
        src: [
          'jquery.embedly.scrollplay.js'
        ],
        dest: 'dist/jquery.embedly.scrollplay-<%= pkg.version %>.js'
      }
    },
    uglify: {
      release: {
        files: {
          'dist/jquery.embedly.scrollplay-<%= pkg.version %>.min.js': ['dist/jquery.embedly.scrollplay-<%= pkg.version %>.js']
        }
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: false,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        es3:true
      },
      all: ['Gruntfile.js', '*.js']
    }
  });

  // Tasks
  grunt.registerTask("release", ["jshint", "concat:release", "uglify:release",]); //"s3:release"]);
};
