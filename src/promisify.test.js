import promisifyRemoteActions from './promisify';

test('promise should resolve', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, {
      status: true,
    }),
  );
  const res = await method(true);
  expect(res).toEqual(true);
});

test('promise should reject', async () => {
  const method = promisifyRemoteActions((input, cb) =>
    cb(input, {
      status: false,
      message: 'failure',
    }),
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

test('promisifies controller methods', async () => {
  const ctrl = promisifyRemoteActions({
    x: cb => cb(1, {status: true}),
    y: cb => cb(2, {status: true}),
    z: cb => cb(3, {status: true}),
  });
  expect(await ctrl.x()).toEqual(1);
  expect(await ctrl.y()).toEqual(2);
  expect(await ctrl.z()).toEqual(3);
});
