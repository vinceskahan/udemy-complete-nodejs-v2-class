var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {

  it('should generate the correct message object', () => {
    // generateMessage
    // store in var
    // assert from match
    // assert text match
    // assert createdAt is number

    const from = "me@example.com";
    const text = "message here";
    var message = generateMessage(from,text);
    // old expect syntax
    //    expect(message).toInclude({from,text});
    // brute force
    //   expect(message.from).toBe(from);
    //   expect(message.text).toBe(text);

    // jest expect
    expect(message).toMatchObject({from,text});

    expect(typeof message.createdAt).toBe('number');
    
  });

});

describe ('generateLocationMessage', () => {

  it('should generate correct location object', () => {
    const from = "admin";
    const latitude = "47.2";
    const longitude = "-122.2";

    var url="https://www.google.com/maps?q=47.2,-122.2";
    var message = generateLocationMessage(from,latitude,longitude);

    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    expect(typeof message.createdAt).toBe('number');
  });

});
