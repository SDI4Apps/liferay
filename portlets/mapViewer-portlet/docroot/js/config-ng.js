'use strict';

var hsl_path = '/wwwlibs/hslayers-ng/';
var gitsha = $.ajax({
    type: "GET",
    url: hsl_path + 'gitsha.js',
    async: false
}).responseText;

require.config({
    urlArgs: 'bust=' + gitsha,
    paths: {
        app: '/mapViewer-portlet/js/app',
        core: hsl_path + 'components/core/core',
        ol: hsl_path + 'node_modules/openlayers/dist/ol-debug'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        dc: {
            deps: ['d3', 'crossfilter']
        },
        s4a: {
            deps: ['ol', 'dc'],
            exports: 's4a'
        }
    }
});

window.name = "NG_DEFER_BOOTSTRAP!";

require(['core'], function(app) {
    require(['app'], function(app) {
        var $html = angular.element(document.getElementsByTagName('html')[0]);
        angular.element().ready(function() {
            angular.resumeBootstrap([app['name']]);
        });
    });
});
