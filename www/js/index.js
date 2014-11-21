/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        mapaFurgoperfecto.initializeMap()
        alert('wtf!');
        navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Current location was found
    // Show de maps
    onSuccess: function(position) {
        alert('position!');
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        alert('longitude: ' + longitude + ' \nlatitude: ' + latitude + '\n')
        var latLong = new google.maps.LatLng(latitude, longitude);
        // var latLong = new google.maps.LatLng(-41.3996433, 2.151494);

        if( mapaFurgoperfecto.map == undefined ) {
          alert('not ready!');
          setTimeout(app.onSuccess(position), 1000);
          return;
        };

        var infowindow = new google.maps.InfoWindow({
           map: mapaFurgoperfecto.map,
           position: latLong,
           content: 'Currrent location'
        });

        mapaFurgoperfecto.map.setCenter(latLong);
        mapaFurgoperfecto.map.setZoom(16);
    },
    // Current location failed
    // alert the error message
    onError: function(error) {
        alert('code: ' + error.code + ' \nmessage: ' + error.message + '\n')
    },
};
