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
      app.receivedEvent('deviceready');

      //Get acceleration data
      $('.btn-acceleration').on('click', function(){

        function onSuccess(acceleration){

          alert('Accel X:'+acceleration.x+'\n'+
          'Accel Y:'+acceleration.y+'\n'+
          'Accel Z:'+acceleration.z+'\n'+
          'Timestamp:'+acceleration.timestamp+'\n');

        }

        navigator.accelerometer.getCurrentAcceleration(onSuccess);
      });

      //Get contact data, JSONify the data
      $('.btn-selectContact').on('click',function(){
        navigator.contacts.pickContact(function(contact){
          alert('The following contact has been selected'+ JSON.stringify(contact.displayName));
        },function(err){
          console.log('Error:'+err);
        });
      });


      //Create a new contact, save contact data
      $('.btn-saveContact').on('click', function(){

        function onSuccessContact(contact){
          alert('Save OK!');
        };

        function onErrorContact(contactError){
          alert('Save FAILED!');
        };

        //For now contact info has been set in hard,
        //we can easily substitute the hard-set data to .val() from forms through jQuery
        var contact = navigator.contacts.create();
        contact.displayName = "Derpette";
        contact.nickName = "Derpina";

        var name = new ContactName();
        name.giveName = "Jane";
        name.familyName = "Doe";
        contact.name = name;

        contact.save(onSuccessContact,onErrorContact);

      });

      //Displays the heading of the device
      $('.btn-compass').on('click', function(){
        function onSuccess(heading){
          alert('Heading: '+heading.magneticHeading);
        };
        function onError(err){
          alert('Something went terribly wrong:'+err.code);
        };

        navigator.compass.getCurrentHeading(onSuccess,onError);
      });


      //Opens up a dialog box
      $('.btn-dialogBox').on('click',function(){
        navigator.notification.alert(
          'Cool!',
          alertDismissed,
          'This is a test dialog box!',
          "OK"
        );

        function alertDismissed(){
          //void
        };
      });

      //Open a browser within the App
      $('.btn-inAppBrowser').on('click',function(){
        var ref = cordova.InAppBrowser.open('http://berelindis.com','_blank');//<-- URL, target
      });

      //Party time! (vibrates the phone)
      $('.btn-vibrate').on('click',function(){
        navigator.vibrate(2000);//<-- duration in /ms
      });

      //Display coords of the device
      $('.btn-geolocation').on('click',function(){

        var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + new Date(position.timestamp)      + '\n');
        };

        function onError(error){
          alert(
            'code:' + error.code + '\n' +
            'message: ' + error.message + '\n');
          };

          navigator.geolocation.getCurrentPosition(onSuccess, onError);

        });

        //Displays the network TYPE
        $('.btn-networkStats').on('click',function(){

          function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            alert('Connection type: ' + states[networkState]);
          }

          checkConnection();
        });

        //Access the camera within the App
        $('.btn-camera').on('click',function(){
          navigator.camera.getPicture(onSuccessVideo, onFailVideo,
            {
              quality : 50, //<-- img quality
              destinationType : Camera.DestinationType.DATA_URL
            });

            function onSuccessVideo(imageData){
              var image = document.getElementById('myImage');
              image.src = "data:image/jpeg:bas64,"+imageData;
            };

            function onFailVideo(message){
              alert('Failed because : '+message);
            };
          });

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
