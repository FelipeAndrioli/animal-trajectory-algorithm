var pureCoverage = false;
var format = 'image/png';
var bounds = [-57.4242515563965, -22.227344512939, -51.8071327209473, -19.5348110198975];

//elementos de composição do popup

var container =  document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});

var mousePositionControl = new ol.control.MousePosition({
  className: 'custom-mouse-position',
  target: document.getElementById('location'),
  coordinateFormat: ol.coordinate.createStringXY(5),
  undefinedHTML: '&nbsp;'
});

var centroide_untiled = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    ratio: 1,
    url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
    params: {'FORMAT': format,
             'VERSION': '1.1.1',  
          "LAYERS": 'iniciacao_cientifica:centroides',
          "exceptions": 'application/vnd.ogc.se_inimage',
    }
  })
});

var centroide_tiled = new ol.layer.Tile({
  visible: false,
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
    params: {'FORMAT': format, 
             'VERSION': '1.1.1',
             tiled: true,
          "LAYERS": 'iniciacao_cientifica:centroides',
          "exceptions": 'application/vnd.ogc.se_inimage',
       tilesOrigin: -58.1991996765137 + "," + -24.0738792419434
    }
  })
});

var ms_vegetacao_untiled = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    ratio: 1,
    url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
    params: {'FORMAT': format,
             'VERSION': '1.1.1',  
          "LAYERS": 'iniciacao_cientifica:ms_vegetacao',
          "exceptions": 'application/vnd.ogc.se_inimage',
    }
  })
});

var ms_vegetacao_tiled = new ol.layer.Tile({
  visible: false,
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
    params: {'FORMAT': format, 
             'VERSION': '1.1.1',
             tiled: true,
          "LAYERS": 'iniciacao_cientifica:ms_vegetacao',
          "exceptions": 'application/vnd.ogc.se_inimage',
       tilesOrigin: -58.2065887451172 + "," + -24.088508605957
    }
  })
});

var amostras_untiled = new ol.layer.Image({
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

var amostras_tiled = new ol.layer.Tile({
  visible: false,
  source: new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/iniciacao_cientifica/wms',
    params: {'FORMAT': format, 
             'VERSION': '1.1.1',
             tiled: true,
          "STYLES": '',
          "LAYERS": 'iniciacao_cientifica:amostras',
          "exceptions": 'application/vnd.ogc.se_inimage',
       tilesOrigin: -22.2273445129395 + "," + -57.4242515563965
    }
  })
});

var OSM = new ol.layer.Tile({
    source: new ol.source.OSM()
});

var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    units: 'degrees',
    axisOrientation: 'neu',
    global: true
});

var map = new ol.Map({
  controls: ol.control.defaults({
    attribution: false
  }).extend([mousePositionControl]),
  target: 'map',
  layers: [
    OSM,
    //ms_vegetacao_tiled,
    //ms_vegetacao_untiled
    //centroide_tiled,
    //centroide_untiled
    amostras_untiled,
    amostras_tiled
  ],
  overlays: [overlay],
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

closer.onclick = function(){
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on('singleclick', function(evt){
  var view = map.getView();
  var viewResolution = view.getResolution();
  var source = amostras_untiled.get('visible') ? amostras_untiled.getSource() : amostras_tiled.getSource();
  var url = source.getGetFeatureInfoUrl(
    evt.coordinate, viewResolution, view.getProjection(),
    {'INFO_FORMAT': 'text/html', 'FEATURE_COUNT': 50});
  if(url){
    content.innerHTML = '<iframe seamless src="' + url + '"></iframe>';
  }
  overlay.setPosition(evt.coordinate);
});





