
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

import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator
} from 'react-native';

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
    alignItems: 'center'
  }
});

const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible };
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

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    this.setState({ visible });
  }

  _renderSpinner() {
    const { visible } = this.state;

    if (!visible)
      return (
        <View />
      );

    const spinner = (
      <View style={styles.container} key={`spinner_${Date.now()}`}>
        <View
          style={[
            styles.background,
            { backgroundColor: this.props.overlayColor }
          ]}>
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={{ flex: 1 }}
            />
        </View>
      </View>
    );

    return (
      <Modal onRequestClose={() => this.close()} visible={visible} transparent>
        {spinner}
      </Modal>
    );

  }

  render() {
    return this._renderSpinner();
  }

}
