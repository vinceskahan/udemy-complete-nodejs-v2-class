var socket = io();

function scrollToBottom () {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }

}

socket.on('connect', function () {
  //console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);

  // client emits event
  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
    } else {
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
  //console.log('Users list', users);
  var ol = jQuery('<ol></ol>');
  users.forEach(function (user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);   //replace the list
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

});



jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox =  jQuery('[name=message]')
  socket.emit('createMessage', {
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
