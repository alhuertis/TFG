/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/',
      'underscore': './node_modules/underscore/underscore.js',
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 
'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 
'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 
'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                       'npm:rxjs',
      'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
      'ng2-drag-drop': 'node_modules/ng2-drag-drop',
      'angular2-material-datepicker': 'npm:angular2-material-datepicker',
      'ng2-file-upload' : 'npm:ng2-file-upload',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular2-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'ng2-drag-drop':  { 
        main: './index.js',  
        defaultExtension: 'js' },
        'angular2-material-datepicker': {
         main: 'index.js',
         defaultExtension: 'js',},

      'ng2-file-upload' : { 
        main: './ng2-file-upload.js',
        defaultExtension: 'js'
      }
        
      
        
    }
  });
})(this);