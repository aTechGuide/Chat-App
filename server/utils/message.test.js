var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generatMessage', () => {
  it('Should generate correct message object', () => {

    var from = 'kamran';
    var text = 'Some message'
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});

  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location message', () => {
    var from = 'kamran';
    var lattitude = 15;
    var longtitude = 19;
    var url = 'https://www.google.com/maps?q=15,19'
    var message = generateLocationMessage(from, lattitude, longtitude);

    expect(message.createdAt).toBeA('number');    
    expect(message).toInclude({from, url});
  })
});