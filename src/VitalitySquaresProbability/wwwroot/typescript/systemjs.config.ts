/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    global.System.config({
        paths: {
            // paths serve as alias
            'lib:': 'js/lib/',
        },
        // map tells the System loader where to look for things
        map: {
            // angular bundles
            '@angular/core': 'lib:@angular/core/bundles/core.umd.js',
            '@angular/common': 'lib:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'lib:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'lib:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'lib:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'lib:@angular/http/bundles/http.umd.js',
            '@angular/router': 'lib:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'lib:@angular/forms/bundles/forms.umd.js',

            // other libraries
            'rxjs': 'lib:rxjs',
            //'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            js: {
                defaultExtension: 'js'
            }
        }
    });
})(this);