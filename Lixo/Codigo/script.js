//var pureCoverage = false;

var format = 'image/png';
var bounds = [-57.4242515563965, -22.227344512939, -51.8071327209473, -19.5348110198975];


      var wfs = new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          /*url: function(extent){
            return 'http://localhost:8080/geoserver/iniciacao_cientifica/ows?service=WFS&' + 
            'version=1.0.0&request=GetFeature&typeName=iniciacao_cientifica:amostras&maxFeatures=50&' +
            'outputFormat=application%2Fjson&srsname=EPSG:4326&' + 
            'bbox=' + extent.join(',') + ',EPSG:4326';
          },
          */

          url: function(extent){
            return 'http://localhost:8080/geoserver/iniciacao_cientifica/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=iniciacao_cientifica:amostras&maxFeatures=50&outputFormat=application%2Fjson'
          },
          strategy: ol.loadingstrategy.tile(ol.tilegrid.createXYZ())
        })
      });

      var mousePositionControl = new ol.control.MousePosition({
        className: 'custom-mouse-position',
        target: document.getElementById('location'),
        coordinateFormat: ol.coordinate.createStringXY(5),
        undefinedHTML: '&nbsp;'
      });

     var wms = new ol.layer.Image({
        source: new ol.source.ImageWMS({
          ratio: 1,
          url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
          params: {'FORMAT': format,
                   'VERSION': '1.1.1',  
                "STYLES": '',
                "LAYERS": 'iniciacao_cientifica:amostras',
                "exceptions": 'application/vnd.ogc.se_inimage',
          }
        })
      });

      var projection = new ol.proj.Projection({
          code: 'EPSG:4326',
          units: 'degrees',
          axisOrientation: 'neu',
          global: true,
      });

      var map = new ol.Map({
        controls: ol.control.defaults({
          attribution: false
        }).extend([mousePositionControl]),
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          }),
          wms,
          wfs
        ],
        view: new ol.View({
            projection: projection
        })
      });

      map.getView().on('change:resolution', function(evt) {
        var resolution = evt.target.get('resolution');
        var units = map.getView().getProjection().getUnits();
        var dpi = 25.4 / 0.28;
        var mpu = ol.proj.METERS_PER_UNIT[units];
        var scale = resolution * mpu * 39.37 * dpi;
        if (scale >= 9500 && scale <= 950000) {
          scale = Math.round(scale / 1000) + "K";
        } else if (scale >= 950000) {
          scale = Math.round(scale / 1000000) + "M";
        } else {
          scale = Math.round(scale);
        }
        document.getElementById('scale').innerHTML = "Scale = 1 : " + scale;
      });

      map.getView().fit(bounds, map.getSize());
      map.on('singleclick', function(evt) {
        var view = map.getView();
        var viewResolution = view.getResolution();
      });
