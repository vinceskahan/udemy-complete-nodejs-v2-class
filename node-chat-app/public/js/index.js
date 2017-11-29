var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  console.log('newLocationMessage: ', message);
  var li = jQuery('<li></li>');
  // open in a new tab when the link is clicked on
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox =  jQuery('[name=message]')
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    // acknowledgement callback
    messageTextbox.val("")
  });
});

// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation#Geolocation_Live_Example
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  // disable button while waiting for response
  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    // re-enable button
    locationButton.removeAttr('disabled').text('Send location');
    // console.log(`console log: lat=${position.coords.latitude} lon=${position.coords.longitude}`)
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    // re-enable button
      locationButton.removeAttr('disabled').text('Send location');
      alert('unable to fetch location');
  },{
    // needed it seems for some browsers and operating systems
    enableHighAccuracy: true
  });
});
