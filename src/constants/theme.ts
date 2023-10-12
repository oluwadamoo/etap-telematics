import { Dimensions, Platform, StyleSheet } from "react-native";
import Constants from 'expo-constants';

const { width, height } = Dimensions.get('window')


export const COLORS = {
    'background': '#1E1E1E',
    'lighter-background': '#313131',
    'white': '#FFF',
    'text-black': '#222',
    'red': '#EB5757',
    'bg-light-002': '#FDF4F9',
    'lighter-red': 'rgba(235, 87, 87, 0.15)',
    'teal-001': '#0898A0',
    'gray': '#7C7B7B'
}

export const SIZES = {
    padding: 20,
    inputPadding: 16,
    width: width,
    height: height,
    statusbar_height: Constants.statusBarHeight
}

export const commonStyles = StyleSheet.create({
    screenWrapper: {
        flex: 1,
        backgroundColor: COLORS['background'],
    },
    row: {
        flexDirection: 'row',
        alignItems: "center"
    },
    normalText: {
        fontFamily: 'dm-sans'
    },
    darkText: {
        fontFamily: 'dm-sans-black'
    },
    boldText: {
        fontFamily: 'dm-sans-b'
    },
    xBoldText: {
        fontFamily: 'dm-sans-xb'
    },
    semiBoldText: {
        fontFamily: 'dm-sans-sb'
    },
    pacificoText: {
        fontFamily: 'pacifico'
    },
    spaceMono: {
        fontFamily: 'spacemono'
    }
})
