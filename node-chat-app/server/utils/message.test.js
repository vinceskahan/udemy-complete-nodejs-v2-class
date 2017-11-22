var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    // generateMessage
    // store in var
    // assert from match
    // assert text match
    // assert createdAt is number

    const from = "me@example.com";
    const text = "message here";
    var message = generateMessage(from,message);
    expect(message.from === from);
    expect(message.text === text);
  });


});
