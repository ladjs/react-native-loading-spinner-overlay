import * as React from 'react';
import { View, Text, Modal, ActivityIndicator } from 'react-native';
import styles from './style';
const transparent = 'transparent';
const Spinner = ({ cancelable = false, color = 'white', animation = 'none', overlayColor = 'rgba(0, 0, 0, 0.25)', size = 'large', textContent = '', textStyle, visible = false, indicatorStyle, customIndicator, children, spinnerKey }) => {
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
        return (React.createElement(View, { style: styles.background },
            customIndicator || (React.createElement(ActivityIndicator, { color: color, size: size, style: [styles.activityIndicator, { ...indicatorStyle }] })),
            React.createElement(View, { style: [styles.textContainer, { ...indicatorStyle }] },
                React.createElement(Text, { style: [styles.textContent, textStyle] }, textContent))));
    };
    const _renderSpinner = () => {
        const spinner = (React.createElement(View, { style: [styles.container, { backgroundColor: overlayColor }], key: spinnerKey || `spinner_${Date.now()}` }, children || _renderDefaultContent()));
        return (React.createElement(Modal, { animationType: animation, onRequestClose: () => _handleOnRequestClose(), supportedOrientations: ['landscape', 'portrait'], transparent: true, visible: spinnerVisible, statusBarTranslucent: true }, spinner));
    };
    return _renderSpinner();
};
export default Spinner;
