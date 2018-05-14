var expect = require('expect');

var {generateMessage} = require('./message');

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