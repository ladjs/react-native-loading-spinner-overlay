
# React Native Loading Spinner Overlay

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads]][npm-url]
[![MIT License][license-image]][license-url]

> **tldr;** The only pure [React Native][react-native] Native iOS and Android loading spinner (progress bar indicator) overlay

![Demo][demo]


## Index

* [Install](#install)
* [Usage](#usage)
* [Platforms](#platforms)
* [Notes](#notes)
* [Development](#development)
* [Contributors](#contributors)
* [Credits](#credits)
* [License](#license)


## Install

For React Native version `>=0.28.x` use version `>=0.3.x` (`0.2.x` is broken, sorry!):

```bash
npm install --save react-native-loading-spinner-overlay@latest
```

For React Native version `<=0.27.x` use version `0.1.x`:

```bash
npm install --save react-native-loading-spinner-overlay@0.1.x
```


## Usage

This usage shows the default styles and properties.

* You can pass a String `size` prop that can either be `"large"` or `"small"` (no other cross-platform sizes are supported right now, and by default it is `"large"`)
* You can pass a String `color` ColorProp (e.g. `red` or `#ff0000`) to change the default spinner color (by default it is `"white"` for high contrast on the default `overlayColor`; see below)
* You can control visibility of the spinner using the Boolean prop `visible` (Boolean, by default it is `false`)
* To change the color of the overlay, pass a ColorProp as the `overlayColor` prop (e.g. `'rgba(0,0,0,0.25)'`)
* Optional text field, activate by passing textContent Prop and style by passing textStyle Prop
* You can also pass a custom view to act as activity indicator.

```js
import React, { View, Text } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

class MyComponent extends React.Component {

  constructor(props) {
    super();
    this.state = {
      visible: false
    };
  }

  /* eslint react/no-did-mount-set-state: 0 */
  componentDidMount() {
    setInterval(() => {
      this.setState({
        visible: !this.state.visible
      });
    }, 3000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Spinner visible={this.state.visible} textContent={{"Loading..."}} textStyle={{color: '#FFF'}} />
      </View>
    );
  }
}
```

To use a custom activity indicator just pass it as child of the component:

```js
<Spinner visible={this.state.visible}>
  <Text>This is my custom spinner</Text>
</Spinner>
```

## Platforms

> For `>= 0.3.x`:

* We use `ActivityIndicator` now!

> For `0.2.x`:

* Do not use this version due to [#22][issue-22], use `>= 0.3.x` please!

> For `<= 0.1.x`:

* iOS: this platform uses `Modal` ([docs][modal-docs]/[source][modal-source]) to overlay and `ActivityIndicatorIOS` ([docs][activity-indicator-docs]) for the loading spinner
* Android: this platform uses `Portal` ([source][portal-source]) to overlay and `ActivityIndicator` ([docs][progress-bar-docs]) for the loading spinner


## Notes

> For `>= 0.3.x`:

* We use `ActivityIndicator` now!

> For `0.2.x`:

* This version is broken due to a dependency issue, see issue [#22][issue-22]

> For `<= 0.1.x`:

* Docs don't exist yet for `Portal`, see [this issue on GitHub][portal-docs-issue]; once those are in, then we can add a link to the source in [Platforms](#platforms)
* Until a release of React Native is shipped [for this pull request][style-attr-issue], Android's `ProgressBarAndroid` will not have support for a `StyleAttr` value of `"Normal"` - therefore we only support a `size` prop of `"small"` or `"large"` right now (defaulting to `"large"`) - in other words, we can only support Android's inverse styling with a `styleAttr` of `"Inverse"`, `"SmallInverse"` (for a `size` prop of `"small"`), and `"LargeInverse"` (for a `size` prop of `"large`") (since there is no `"Normal"` support right now for `"size"` of `"normal"`).


## Development

1. Fork/clone this repository
2. Run `npm install`
4. Make changes in `src` directory
6. Run `npm test` when you're done
7. Submit a pull request


## Contributors

* Nick Baugh <niftylettuce@gmail.com>


## License

[MIT][license-url]


[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE
[react-native]: https://facebook.github.io/react-native
[npm-image]: http://img.shields.io/npm/v/react-native-loading-spinner-overlay.svg?style=flat
[npm-url]: https://npmjs.org/package/react-native-loading-spinner-overlay
[npm-downloads]: http://img.shields.io/npm/dm/react-native-loading-spinner-overlay.svg?style=flat
[portal-source]: https://github.com/facebook/react-native/blob/master/Libraries/Portal/Portal.js
[modal-docs]: https://facebook.github.io/react-native/docs/modal.html
[modal-source]: https://github.com/facebook/react-native/blob/master/Libraries/Modal/Modal.js
[demo]: https://cdn.rawgit.com/niftylettuce/react-native-loading-spinner-overlay/master/media/demo.gif
[activity-indicator-docs]: https://facebook.github.io/react-native/docs/activityindicatorios.html
[progress-bar-docs]: https://facebook.github.io/react-native/docs/activityindicator.html
[portal-docs-issue]: https://github.com/facebook/react-native/issues/2501
[style-attr-issue]: https://github.com/facebook/react-native/pull/4974
[issue-22]: https://github.com/niftylettuce/react-native-loading-spinner-overlay/issues/22
