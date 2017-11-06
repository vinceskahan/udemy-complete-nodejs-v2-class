const expect = require('expect');

describe('App', () => {

  it('should call the spy correctly', () => {
    var spy = expect.createSpy();

    // example with params
    spy("Andrew",25);
    expect(spy).toHaveBeenCalledWith('Andrew', 25);

  });

});
