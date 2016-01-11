
//     react-native-loading-spinner-overlay
//     Copyright (c) 2016- Nick Baugh <niftylettuce@gmail.com>
//     MIT Licensed

// * Author: [@niftylettuce](https://twitter.com/#!/niftylettuce)
// * Source:
// <https://github.com/niftylettuce/react-native-loading-spinner-overlay>

// # react-native-loading-spinner-overlay
//
// <https://github.com/facebook/react-native/issues/2501>
// <https://rnplay.org/apps/1YkBCQ>
// <https://github.com/facebook/react-native/issues/2501>
// <https://github.com/brentvatne/react-native-overlay>
//

import React, {
  Platform,
  StyleSheet,
  View,
  Dimensions,
  Modal
} from 'react-native';

const Portal = require('react-native/Libraries/Portal/Portal.js');

import autobind from 'autobind-decorator';
import GiftedSpinner from 'react-native-gifted-spinner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)'
  }
});

const SIZES = ['small', 'normal', 'large'];

let tag;

@autobind
export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }

  static propTypes = {
    visible: React.PropTypes.bool,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string
  };

  static defaultProps = {
    visible: false,
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  componentWillMount() {
    if (Platform.OS === 'android')
      tag = Portal.allocateTag();
  }

  componentWillUnmount() {
    if (Platform.OS === 'android')
      tag = null;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps
    });
  }

  componentWillUpdate(nextProps, nextState) {

    if (Platform.OS !== 'android') return;

    if (nextState.visible)
      return Portal.showModal(tag, this._renderSpinner());

    Portal.closeModal(tag);

  }

  _renderSpinner() {

    if (!this.state.visible)
      return (
        <View />
      );

    // TODO: once RN version is released for this pull request
    // then we will integrate this `"Normal"` styleAttr property as default
    //let styleAttr = 'Normal';

    let styleAttr = 'Inverse';
    let size = 'large';

    switch (this.state.size) {
    case 'small':
      styleAttr = 'SmallInverse';
      size = 'small';
      break;
    case 'large':
      styleAttr = 'LargeInverse';
      size = 'large';
      break;
    }

    let spinner = (
      <View style={styles.container}>
        <View
          style={[
            styles.background,
            { backgroundColor: this.state.overlayColor }
          ]}>
          <GiftedSpinner
            color={this.state.color}
            size={size}
            style={{ flex: 1 }}
            styleAttr={styleAttr}/>
        </View>
      </View>
    );

    if (Platform.OS === 'android')
      return spinner;

    return (
      <Modal visible={this.state.visible} transparent>
        {spinner}
      </Modal>
    );

  }

  render() {
    return this._renderSpinner();
  }

};
