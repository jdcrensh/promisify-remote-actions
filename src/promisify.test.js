import promisifyRemoteActions from './promisify';

it('should resolve promise', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, { status: true })
  );
  const res = await method(true);
  expect(res).toEqual(true);
});

it('should reject promise', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, { status: false, message: 'failure' })
  );
  expect.assertions(1);
  try {
    await method(true);
  } catch (e) {
    expect(e).toEqual({
      status: false,
      message: 'failure',
    });
  }
});

it('should promisify controller methods', async () => {
  const ctrl = promisifyRemoteActions({
    x: cb => cb(1, { status: true }),
    y: cb => cb(2, { status: true }),
    z: cb => cb(3, { status: true }),
  });
  expect(await ctrl.x()).toEqual(1);
  expect(await ctrl.y()).toEqual(2);
  expect(await ctrl.z()).toEqual(3);
});

it('should use provided callback', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, { status: true })
  );
  const cb = jest.fn();
  method('hello', cb);
  expect(cb).toHaveBeenCalledWith('hello', { status: true });
});

it('should use provided callback and options', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, { status: true })
  );
  const cb = jest.fn();
  method('hello', cb, { escape: false });
  expect(cb).toHaveBeenCalledWith('hello', { status: true });
});
