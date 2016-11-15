
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
  Image,
  View,
  Text,
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
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: 'bold'
  },
  customSpinnerContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  customSpinner: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  }
});

const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.Component {

  constructor(props) {
    super(props);
    this.state = { visible: this.props.visible, textContent: this.props.textContent};
  }

  static propTypes = {
    visible: React.PropTypes.bool,
    textContent: React.PropTypes.string,
    color: React.PropTypes.string,
    size: React.PropTypes.oneOf(SIZES),
    overlayColor: React.PropTypes.string
  };

  static defaultProps = {
    visible: false,
    textContent: '',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  close() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(nextProps) {
    const { visible, textContent } = nextProps;
    this.setState({ visible, textContent });
  }

  _renderSpinner() {
    const { visible, textContent } = this.state;

    if (!visible)
      return (
        <View />
      );

    const customSpinner = (
      this.props.source ? <View style={ styles.customSpinnerContainer }><Image source={this.props.source} style={[styles.customSpinner, this.props.spinnerStyle]} /></View> :
      <ActivityIndicator
                color={this.props.color}
                size={this.props.size}
                style={{ flex: 1 }}
                />
    );

    const spinner = (
      <View style={styles.container} key={`spinner`}>
        <View
          style={[
            styles.background,
            { backgroundColor: this.props.overlayColor }
          ]}>
          {customSpinner}
          <View style={styles.textContainer}>
            <Text style={[styles.textContent, this.props.textStyle]}>{textContent}</Text>
          </View>
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
