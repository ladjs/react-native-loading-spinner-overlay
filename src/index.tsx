/* eslint @typescript-eslint/prefer-nullish-coalescing: 0 */
import * as React from 'react';
import {
  View,
  Text,
  Modal,
  ActivityIndicator,
  TextStyle,
  ViewStyle
} from 'react-native';
import styles from './style';

export interface SpinnerPropTypes {
  cancelable?: boolean;
  color?: string;
  animation?: 'none' | 'slide' | 'fade';
  overlayColor?: string;
  size?: 'small' | 'large' | number; // size props does not support value normal
  textContent?: string;
  textStyle?: TextStyle;
  visible?: boolean;
  indicatorStyle?: ViewStyle;
  customIndicator?: React.ReactNode;
  children?: React.ReactNode;
  spinnerKey?: string;
}

const Spinner = ({
  cancelable = false,
  color = 'white',
  animation = 'none',
  overlayColor = 'rgba(0, 0, 0, 0.25)',
  size = 'large',
  textContent = '',
  textStyle,
  visible = false,
  indicatorStyle,
  customIndicator,
  children,
  spinnerKey
}: SpinnerPropTypes) => {
  const [spinnerVisible, setSpinnerVisibility] = React.useState(visible);
  const close = () => {
    setSpinnerVisibility(false);
  };

  const _handleOnRequestClose = () => {
    if (cancelable) {
      close();
    }
  };

  React.useEffect(() => {
    setSpinnerVisibility(visible);
  }, [visible]);
  const _renderDefaultContent = () => {
    return (
      <View style={styles.background}>
        {customIndicator || (
          <ActivityIndicator
            color={color}
            size={size}
            style={[styles.activityIndicator, { ...indicatorStyle }]}
          />
        )}
        <View style={[styles.textContainer, { ...indicatorStyle }]}>
          <Text style={[styles.textContent, textStyle]}>{textContent}</Text>
        </View>
      </View>
    );
  };

  const _renderSpinner = () => {
    const spinner = (
      <View
        style={[styles.container, { backgroundColor: overlayColor }]}
        key={spinnerKey || `spinner_${Date.now()}`}
      >
        {children || _renderDefaultContent()}
      </View>
    );

    return (
      <Modal
        animationType={animation}
        onRequestClose={() => {
          _handleOnRequestClose();
        }}
        supportedOrientations={['landscape', 'portrait']}
        transparent
        visible={spinnerVisible}
        statusBarTranslucent={true}
      >
        {spinner}
      </Modal>
    );
  };

  return _renderSpinner();
};

export default Spinner;
