'use strict';

var hsl_path = '/wwwlibs/hslayers-ng/';
require.config({
    paths: {
        sidebar: hsl_path + 'components/sidebar/sidebar',
        toolbar: hsl_path + 'components/toolbar/toolbar',
        layermanager: hsl_path + 'components/layermanager/layermanager',
        ows: hsl_path + 'components/ows/ows',
        'ows.wms': hsl_path + 'components/ows/ows_wms',
        'ows.nonwms': hsl_path + 'components/ows/ows_nonwms',
        'ows.wmsprioritized': hsl_path + 'components/ows/ows_wmsprioritized',
        query: hsl_path + 'components/query/query',
        search: hsl_path + 'components/search/search',
        permalink: hsl_path + 'components/permalink/permalink',
        geolocation: hsl_path + 'components/geolocation/geolocation',
        measure: hsl_path + 'components/measure/measure',
        legend: hsl_path + 'components/legend/legend',
        app: '/js/map/config-lite',
        core: hsl_path + 'components/core/core',
        api: hsl_path + 'components/api/api',
        translations: hsl_path + 'components/translations/js/translations'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        dc: {
            deps: ['d3', 'crossfilter']
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