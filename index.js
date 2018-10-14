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
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const transparent = 'transparent';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: transparent,
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
  activityIndicator: {
    flex: 1
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

export default class Spinner extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      textContent: this.props.textContent
    };
  }

  static propTypes = {
    cancelable: PropTypes.bool,
    color: PropTypes.string,
    animation: PropTypes.oneOf(ANIMATION),
    overlayColor: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    textContent: PropTypes.string,
    textStyle: PropTypes.object,
    visible: PropTypes.bool,
    indicatorStyle: PropTypes.object,
    customIndicator: PropTypes.element,
    children: PropTypes.element
  };

  static defaultProps = {
    visible: false,
    cancelable: false,
    textContent: '',
    animation: 'none',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.25)'
  };

  close() {
    this.setState({ visible: false });
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};
    if (state.visible !== props.visible) newState.visible = props.visible;
    if (state.textContent !== props.textContent)
      newState.textContent = props.textContent;
    return newState;
  }

  _handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  _renderDefaultContent() {
    return (
      <View style={styles.background}>
        {this.props.customIndicator ? (
          this.props.customIndicator
        ) : (
          <ActivityIndicator
            color={this.props.color}
            size={this.props.size}
            style={[styles.activityIndicator, { ...this.props.indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...this.props.indicatorStyle }]}>
          <Text style={[styles.textContent, this.props.textStyle]}>
            {this.state.textContent}
          </Text>
        </View>
      </View>
    );
  }

  _renderSpinner() {
    if (!this.state.visible) return null;

    const spinner = (
      <View
        style={[styles.container, { backgroundColor: this.props.overlayColor }]}
        key={`spinner_${Date.now()}`}
      >
        {this.props.children
          ? this.props.children
          : this._renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={this.props.animation}
        onRequestClose={() => this._handleOnRequestClose()}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={this.state.visible}
      >
        {spinner}
      </Modal>
    );
  }

  render() {
    return this._renderSpinner();
  }
}
