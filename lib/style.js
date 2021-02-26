import { StyleSheet } from 'react-native';
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
export default styles;
