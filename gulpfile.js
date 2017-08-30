var gulp = require('gulp');
var webpack = require('gulp-webpack');
var watch = require('gulp-watch');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var uglify = require('gulp-uglify');
var file = require('gulp-file');
var zip = require('gulp-zip');
var config = require('./config.json')




var globsClean = ['*.*','app/*','app/api/**/*','app/cache/**/*','app/dist/**/*',
                  'app/view/**/*','app/vendor/**/*','app/source/**/*']
var globsPath = ['.','app/','app/api/','app/cache/','app/dist/','app/view/',
                  'app/vendor/','app/source/']
var globs2 = ['*','**','*.*','**/*.*','**/.*','!app/src/**/.*','!app/src/**','!.git/**/.*',
    '!.git/**','!.git/','!node_modules/','!app/src/','!gulpfile.js','!.gitignore','!.env',
    '!package.json','!.babelrc','!.down','!composer.json', '!composer.lock', '!app/cache/view/*',
    '!node_modules/**/.*','!app/upload/*.jpg','!app/upload/*.png','!node_modules/**'];


gutil.log(config)

var connTest = ftp.create( {
    host:     'test.cinemasetareh.ir',
    user:     config.username,
    password: config.password,
    parallel: 5,
    idleTimeout : 5000,
    log:      gutil.log
});

var conn = ftp.create( {
    host:     'cinemasetareh.ir',
    user:     config.username,
    password: config.password,
    parallel: 5,
    idleTimeout : 5000,
    log:      gutil.log
});






gulp.task('webpack', function() {
  return gulp.src('./app/src/main.js')
    .pipe(webpack({
      watch : true,
      output: {
        filename: '[name].build.js'
      },
      module: {
        // Special compilation rules
        loaders: [
          {
            // Ask webpack to check: If this file ends with .js, then apply some transforms
            test: /\.vue$/,
            loader: 'vue-loader',
            
          }, 
          {
            // Ask webpack to check: If this file ends with .js, then apply some transforms
            test: /\.js$/,
            // Transform it with babel
            loader: 'babel',
            // don't transform node_modules folder (which don't need to be compiled)
            exclude: /node_modules/
          }
        ]
      }
    }))
    .pipe(gulp.dest('./app/dist/'))
  //  .pipe(uglify())
   // .pipe(gulp.dest('./app/dist/'))
});


gulp.task( 'deploy', function () {
 
    return watch( globs2, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html/' ) ) // only upload newer files 
        .pipe( conn.dest( '/public_html/' ) );
 
});

gulp.task( 'deploy-first', function () {
 
    return gulp.src( globs2, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html/' ) ) // only upload newer files 
        .pipe( conn.dest( '/public_html/' ) );
 
});

gulp.task( 'deploy-test', function () {

 
    return watch( globs2, { base: '.', buffer: false } )
        .pipe( connTest.newer( '/test.cinemasetareh.ir/' ) ) // only upload newer files 
        .pipe( connTest.dest( '/test.cinemasetareh.ir/' ) );
 
});

gulp.task( 'clean-test', function () {

    globsClean.some((el,i)=>{
      connTest.clean( '/test.cinemasetareh.ir/'+el ,globsPath[i]);  
    })
});

gulp.task( 'clean', function () {

  globsClean.some((el,i)=>{
      conn.clean( '/public_html/'+el ,globsPath[i]);  
  })

});


gulp.task( 'deploy-test-first', function () {
 
    return gulp.src( globs2, { base: '.', buffer: false } )
        .pipe( connTest.newer( '/test.cinemasetareh.ir/' ) ) // only upload newer files 
        .pipe( connTest.dest( '/test.cinemasetareh.ir/' ) );
 
} );


gulp.task('zip', function() {
  return gulp
    .src(globs2)
    .pipe(zip('pkg.zip'))
    .pipe(gulp.dest('.'));
});


 


gulp.task('test', [  'webpack' , 'deploy-test' ]);

gulp.task('default', [  'webpack' , 'deploy' ]);








function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 15; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
function preDir(globs, dir){
  let a = [];
  globs.some((el)=>{
    if(el.substr(0,1) == "!"){
      let f = el.substr(1,el.length)
      a.push("!"+dir+f)
    }else{
      a.push(dir+el)
    }
  })
  return a
}


