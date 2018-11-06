# promisify-remote-actions

Promisifies an Apex controller's @RemoteAction methods.

## Install

`npm install -S promisify-remote-actions`

## Usage Example

#### Javascript (ES6)

```js
import promisifyRemoteActions from 'promisify-remote-actions';

const ctrl = promisifyRemoteActions(window.MyApexController);

ctrl.sum([1, 2, 3])
  .then(sum => {
    // sum = 6
    return ctrl.divide(sum, 3);
  })
  .then(avg => {
    // avg = 2
    return ctrl.divide(avg, 0);
  })
  .catch(err => {
    console.assert(err.status === false);
    console.assert(err.message === 'Divide by 0');
  });
```

#### Apex Controller

```java
public class MyApexController {

  @RemoteAction
  public static Integer sum(List<Integer> values) {
    Integer res = 0;
    for (Integer value : values) {
      res += value;
    }
    return res;
  }

  @RemoteAction
  public static Decimal divide(Integer dividend, Integer divisor) {
    return dividend / divisor;
  }
}
```

## Development

### Run tests

`yarn test`

### Build

`yarn build`
