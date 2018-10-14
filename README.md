# React Native Loading Spinner Overlay

[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://github.com/lassjs/lass)
[![license](https://img.shields.io/github/license/joinspontaneous/react-native-loading-spinner-overlay.svg)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/react-native-loading-spinner-overlay.svg)](https://npm.im/react-native-loading-spinner-overlay)

<img src="https://cdn.jsdelivr.net/gh/joinspontaneous/react-native-loading-spinner-overlay@1.0.0/media/demo.gif" width="200" height="393.5" alt="" />


## Table of Contents

* [Install](#install)
* [Example](#example)
* [Options](#options)
* [Recommended Implementation](#recommended-implementation)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install react-native-loading-spinner-overlay
```

[yarn][]:

```sh
yarn add react-native-loading-spinner-overlay
```


## Example

See [the example App.js file][example] for an example implementation.


## Options

| Property        | Type                                     | Default               | Description                                                                                                                                                                                      |
| --------------- | ---------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| cancelable      | Boolean                                  | `false`               | **Android**: If set to false, it will prevent spinner from hiding when pressing the hardware back button.  If set to true, it will allow spinner to hide if the hardware back button is pressed. |
| color           | String                                   | `"white"`             | Changes the spinner's color (example values are `red`, `#ff0000`, etc). For adjusting the contrast see `overlayColor` prop below.                                                                |
| animation       | String (enum) `none`, `slide`, `fade`    | `"none"`              | Changes animation on show and hide spinner's view.                                                                                                                                               |
| overlayColor    | String                                   | `rgba(0, 0, 0, 0.25)` | Changes the color of the overlay.                                                                                                                                                                |
| size            | String (enum) `small`, `normal`, `large` | `"large"`             | Sets the spinner's size. No other cross-platform sizes are supported right now.                                                                                                                  |
| textContent     | String                                   | `""`                  | Optional text field to be shown.                                                                                                                                                                 |
| textStyle       | StyleSheet                               | `-`                   | The style to be applied to the `<Text>` that displays the `textContent`.                                                                                                                         |
| visible         | Boolean                                  | `false`               | Controls the visibility of the spinner.                                                                                                                                                          |
| indicatorStyle  | StyleSheet                               | `undefined`           | Additional styles for the [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator) to inherit                                                                         |
| customIndicator | Element                                  | `undefined`           | An alternative, custom component to use instead of the default `<ActivityIndicator />`                                                                                                           |
| children        | Element                                  | `undefined`           | Children element(s) to nest inside the spinner                                                                                                                                                   |


## Recommended Implementation

We recommend that you follow two rules when implementing this component.

1. Integrate it inside the parent-most/top-level/root component in your app
2. Wrap usage of actions after attempting to stop the spinner with `setTimeout` to avoid [the non-stop spinner issue](https://github.com/joinspontaneous/react-native-loading-spinner-overlay/issues/30):

   ```js
   this.setState({ spinner: false });

   setTimeout(() => {
     Alert.alert('Oops!', err.message);
   }, 100);
   ```


## Contributors

| Name                | Website                   |
| ------------------- | ------------------------- |
| **Nick Baugh**      | <http://niftylettuce.com> |
| **Spencer Snyder**  | <http://spencersnyder.io> |
| **Luciano Lima**    |                           |
| **George Savvidis** |                           |
| **Sandro Machado**  |                           |
| **Ben Sutter**      |                           |
| **Ivan Kuznetsov**  |                           |
| **Darren Camp**     |                           |
| **Rigo B Castro**   |                           |
| **Raj Kissu**       |                           |
| **Ivan Pusic**      |                           |
| **Antonio Grass**   |                           |
| **Vijay Chouhan**   |                           |
| **Jacob Lee**       |                           |
| **Matt Labrum**     |                           |


## License

[MIT](LICENSE) © Nick Baugh


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/

[example]: https://github.com/joinspontaneous/react-native-loading-spinner-overlay/blob/master/example/App.js
