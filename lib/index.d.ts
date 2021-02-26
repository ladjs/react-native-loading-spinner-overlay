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
