var map
  , infowindow = null;

var mapaFurgoperfecto = {
    // Initialize markers
    markers: [],
    /*
     * Options
     */
    options: {
        apiUrl:    'http://www.furgovw.org/api.php',
        zoom:      5,
        centerLat: 38.50,
        centerLng: 0.35,
        markerClustererMaxZoom: 10
    },
    /*
     * Icons
     */
    icons: [
        'http://www.furgovw.org/mapa_imagenes/furgonetikaiconozo2.png',
        'http://www.furgovw.org/mapa_imagenes/balonrojodu6.png',
        'http://www.furgovw.org/mapa_imagenes/balonverdese8.png',
        '',
        'http://www.furgovw.org/mapa_imagenes/campingnh4.png',
        'http://www.furgovw.org/mapa_imagenes/centrocomercialdo4.jpg',
        'http://www.furgovw.org/mapa_imagenes/campingtp.jpg'
    ],
    /*
     * Initialize map
     */
    initializeMap: function(location) {

        infowindow = new google.maps.InfoWindow({
            content: "holding..."
        });

        var latlng = new google.maps.LatLng(this.options.centerLat, this.options.centerLng);

        var mapOptions = {
            zoom: this.options.zoom,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
        mapaFurgoperfecto.map = new google.maps.Map(document.getElementById("geolocation"), mapOptions);

        google.maps.event.addListener(mapaFurgoperfecto.map, 'bounds_changed',function() {
            if (!mapaFurgoperfecto.map.firstTime) {
                mapaFurgoperfecto.loadSpots();
                mapaFurgoperfecto.map.firstTime = true;
            }
        });

    },
    /*
     * Load spots from furgovw API
     */
    loadSpots: function() {
        var queryString = this.queryString();
        var url = this.options.apiUrl;

        // window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
        // var data = $.getJSON("furgo_perfecto.json");

        mapaFurgoperfecto.spots = spots;
        mapaFurgoperfecto.addSpotsToMap();
    },
    addSpotsToMap: function () {

        for (var x = 0; x < mapaFurgoperfecto.spots.length; x++) {
            var latlng = new google.maps.LatLng(mapaFurgoperfecto.spots[x].lng, mapaFurgoperfecto.spots[x].lat);

            var marker = new google.maps.Marker({
                position: latlng,
                title:  mapaFurgoperfecto.spots[x].nombre,
                link:   mapaFurgoperfecto.spots[x].link,
                imagen: mapaFurgoperfecto.spots[x].imagen,
                autor:  mapaFurgoperfecto.spots[x].autor,
                icon:   mapaFurgoperfecto.icons[mapaFurgoperfecto.spots[x].icono]
                });
            this.markers.push(marker);

            google.maps.event.addListener(marker, 'click', function() {

                var markerHTML =
                    '<div class="mapaFurgoperfectoSpot">' +
                        '<h3>' +
                            '<a target="_blank" href="' + this.link + '" onclick="window.open(\'' + this.link + '\', \'_system\');" >' + this.title + '</a>' +
                        '</h3>' +
                        '<a target="_blank" href="' + this.link + '" onclick="window.open(\'' + this.link + '\', \'_system\');" >' +
                            '<img src="' + this.imagen + '">' +
                        '</a>' +
                        '<br>' +
                        'A&ntilde;adido por ' + this.autor;

                infowindow.setContent(markerHTML);
                infowindow.open(mapaFurgoperfecto.map, this);
            });
        }

        var mcOptions = {gridSize: 50, maxZoom: this.options.markerClustererMaxZoom};
        this.markerClusterer = new MarkerClusterer(mapaFurgoperfecto.map, this.markers, mcOptions);

        $('.loading').hide();
    },
    //http://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter
    queryString: function () {
      var query_string = {};
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
            // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]], pair[1] ];
          query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
          query_string[pair[0]].push(pair[1]);
        }
      }
        return query_string;
    },
};
