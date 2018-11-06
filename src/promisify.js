const wrap = (remoteAction, options = {}) => (...args) => {
  if (args.length && typeof args[args.length - 1] === 'function') {
    return remoteAction.apply(window, [...args, options]);
  }
  return new Promise((resolve, reject) => {
    args.push((res, event) => {
      try {
        if (!event.status) {
          reject(event);
        } else {
          resolve(res);
        }
      } catch (e) {
        reject(e);
      }
    });
    args.push(options);
    remoteAction.apply(window, args);
  });
};

const promisifyRemoteActions = (Ctrl, options = {}) => {
  if (typeof Ctrl === 'function') {
    return wrap(Ctrl, options);
  }
  return Array.reduce(
    Object.getOwnPropertyNames(Ctrl),
    (res, name) => {
      if (typeof Ctrl[name] === 'function') {
        res[name] = wrap(Ctrl[name], options);
      }
      return res;
    },
    {}
  );
};

export default promisifyRemoteActions;
