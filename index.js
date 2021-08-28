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

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const transparent = 'transparent';
const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1
  },
  background: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  container: {
    backgroundColor: transparent,
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  textContainer: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  textContent: {
    fontSize: 20,
    fontWeight: 'bold',
    height: 50,
    top: 80
  }
});

const ANIMATION = ['none', 'slide', 'fade'];
const SIZES = ['small', 'normal', 'large'];

const Spinner = props => {
  const [visible, setVisible] = useState(props?.visible);
  const [textContent, setTextContent] = useState(props?.textContent);

  useEffect(
    () => {
      setVisible(props?.visible);
    },
    [props?.visible]
  );
  useEffect(
    () => {
      setTextContent(props?.textContent);
    },
    [props?.textContent]
  );

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const _handleOnRequestClose = useCallback(
    () => {
      if (props.cancelable) {
        onClose();
      }
    },
    [props?.cancelable]
  );

  const _renderDefaultContent = useCallback(
    () => (
      <View style={styles.background}>
        {props.customIndicator ? (
          props.customIndicator
        ) : (
          <ActivityIndicator
            color={props.color}
            size={props.size}
            style={[styles.activityIndicator, { ...props.indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...props.indicatorStyle }]}>
          <Text style={[styles.textContent, props.textStyle]}>
            {textContent}
          </Text>
        </View>
      </View>
    ),
    [
      props.customIndicator,
      props.color,
      props.size,
      props.indicatorStyle,
      props.textStyle,
      textContent
    ]
  );

  const spinner = useCallback(
    () => (
      <View
        style={[styles.container, { backgroundColor: props?.overlayColor }]}
        key={props.spinnerKey ? props.spinnerKey : `spinner_${Date.now()}`}
      >
        {props.children ? props.children : _renderDefaultContent()}
      </View>
    ),
    [
      _renderDefaultContent,
      props?.overlayColor,
      props.children,
      props.spinnerKey
    ]
  );
  return (
    <Modal
      animationType={props.animation}
      onRequestClose={_handleOnRequestClose}
      supportedOrientations={['landscape', 'portrait']}
      transparent
      visible={visible}
      statusBarTranslucent={true}
    >
      {spinner()}
    </Modal>
  );
};

Spinner.propTypes = {
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
  children: PropTypes.element,
  spinnerKey: PropTypes.string
};

Spinner.defaultProps = {
  visible: false,
  cancelable: false,
  textContent: '',
  animation: 'none',
  color: 'white',
  size: 'large', // 'normal',
  overlayColor: 'rgba(0, 0, 0, 0.25)'
};

export default Spinner;
