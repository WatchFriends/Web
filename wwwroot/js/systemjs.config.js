/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'module/': '/module'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: '/js',

      // angular bundles
      '@angular/core': 'module/@angular/core/bundles/core.umd.min.js',
      '@angular/common': 'module/@angular/common/bundles/common.umd.min.js',
      '@angular/compiler': 'module/@angular/compiler/bundles/compiler.umd.min.js',
      '@angular/platform-browser': 'module/@angular/platform-browser/bundles/platform-browser.umd.min.js',
      '@angular/platform-browser-dynamic': 'module/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      '@angular/http': 'module/@angular/http/bundles/http.umd.min.js',
      '@angular/router': 'module/@angular/router/bundles/router.umd.min.js',
      '@angular/router/upgrade': 'module/@angular/router/bundles/router-upgrade.umd.min.js',
      '@angular/forms': 'module/@angular/forms/bundles/forms.umd.min.js',
      '@angular/upgrade': 'module/@angular/upgrade/bundles/upgrade.umd.min.js',
      '@angular/upgrade/static': 'module/@angular/upgrade/bundles/upgrade-static.umd.min.js',

      // other libraries
      'rxjs':                      'module/rxjs',
      'angular-in-memory-web-api': 'module/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
