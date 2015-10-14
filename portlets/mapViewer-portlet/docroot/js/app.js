'use strict';

define(['ol', 'toolbar', 'layermanager', 'WfsSource', 'map', 'query', 'search', 'print', 'permalink', 'lodexplorer', 'measure', 'geolocation', 'datasource_selector', 'api', 'ows', 'status_creator'],

    function(ol, toolbar, layermanager, WfsSource) {
        var module = angular.module('hs', [
            'hs.toolbar',
            'hs.layermanager',
            'hs.query',
            'hs.search', 'hs.print', 'hs.permalink', 'hs.lodexplorer',
            'hs.geolocation',
            'hs.datasource_selector',
            'hs.status_creator',
            'hs.api',
            'hs.ows'
        ]);

        module.directive('hs', ['hs.map.service', 'Core', function(OlMap, Core) {
            return {
                templateUrl: hsl_path + 'hslayers.html',
                link: function(scope, element) {
                        var w = angular.element($(window));
                        w.bind('resize', function() {
                            var el = $(element[0]);
                            var windowHeight = $(window).height();
                            var headerHeight = $('.portlet-dockbar').outerHeight() + $('#banner').outerHeight() +6;
                            var elementHeight = windowHeight - headerHeight;
                            el.height(elementHeight);
                            $("#map").height(elementHeight);
                            OlMap.map.updateSize();
                        });
                        w.resize();
                }
            };
        }]);

        var style = new ol.style.Style({
            image: new ol.style.Circle({
                fill: new ol.style.Fill({
                    color: [242, 121, 0, 0.7]
                }),
                stroke: new ol.style.Stroke({
                    color: [0xbb, 0x33, 0x33, 0.7]
                }),
                radius: 5
            }),
            fill: new ol.style.Fill({
                color: "rgba(139, 189, 214, 0.3)",
            }),
            stroke: new ol.style.Stroke({
                color: '#112211',
                width: 1
            })
        })

        module.value('config', {
            default_layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                    title: "Base layer",
                    base: true,
                    removable: false
                })
            ],
            project_name: 'erra/map',
            default_view: new ol.View({
                center: ol.proj.transform([17.474129, 52.574000], 'EPSG:4326', 'EPSG:3857'), //Latitude longitude    to Spherical Mercator
                zoom: 4,
                units: "m"
            })
        });

        module.controller('Main', ['$scope', 'Core', 'hs.query.service_infopanel', 'hs.map.service',
            function($scope, Core, InfoPanelService, OlMap) {
                if (console) console.log("Main called");
                $scope.hsl_path = hsl_path; //Get this from hslayers.js file
                $scope.Core = Core;

                $scope.$on('infopanel.updated', function(event) {});
            }
        ]);

        return module;
    });
