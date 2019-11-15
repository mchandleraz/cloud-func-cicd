const { constants, helloWorld } = require('./index.js');

describe('helloWorld', () => {
  it('returns a default message when the request body does not contain a message', () => {
    const req = {
        query: {},
        body: {},
    };
    const resBaseObject = {send: jest.fn()};
    const res = {
      ...resBaseObject,
        status: jest.fn().mockImplementation(() => (resBaseObject)),
    }

    helloWorld(req, res);

    expect(res.send).toHaveBeenCalledWith(constants.DEFAULT_MESSAGE)
  })
  it('returns a default message when the request query does not contain a message', () => {
    const req = {
        query: {},
        body: {},
    };
    const resBaseObject = {send: jest.fn()};
    const res = {
        ...resBaseObject,
        status: jest.fn().mockImplementation(() => (resBaseObject)),
    };

    helloWorld(req, res);

    expect(res.send).toHaveBeenCalledWith(constants.DEFAULT_MESSAGE)
  })
  it('echos the message provided in the request body', () => {
    const req = {
        query: {},
        body: { message: 'chz' },
    };
    const resBaseObject = {send: jest.fn()};
    const res = {
        ...resBaseObject,
        status: jest.fn().mockImplementation(() => (resBaseObject)),
    };

    helloWorld(req, res);

    expect(res.send).toHaveBeenCalledWith('chz')
  })
  it('echos the message provided in the request query', () => {
    const req = {
        query: { message: 'boo' },
        body: {},
    };
    const resBaseObject = {send: jest.fn()};
    const res = {
        ...resBaseObject,
        status: jest.fn().mockImplementation(() => (resBaseObject)),
    };

    helloWorld(req, res);

    expect(res.send).toHaveBeenCalledWith('boo')
  })
})
