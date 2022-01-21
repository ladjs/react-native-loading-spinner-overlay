import * as React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
export interface SpinnerPropTypes {
    cancelable?: boolean;
    color?: string;
    animation?: 'none' | 'slide' | 'fade';
    overlayColor?: string;
    size?: 'small' | 'large' | number;
    textContent?: string;
    textStyle?: TextStyle;
    visible?: boolean;
    indicatorStyle?: ViewStyle;
    customIndicator?: React.ReactNode;
    children?: React.ReactNode;
    spinnerKey?: string;
}
declare const Spinner: ({ cancelable, color, animation, overlayColor, size, textContent, textStyle, visible, indicatorStyle, customIndicator, children, spinnerKey }: SpinnerPropTypes) => JSX.Element;
export default Spinner;
