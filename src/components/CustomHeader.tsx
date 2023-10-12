import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native'
import React from 'react'
import { COLORS, SIZES, commonStyles } from '../constants/theme'

const CustomHeader = () => {
    return (
        <SafeAreaView >
            <View style={styles.container}>
                <Text style={{ ...commonStyles.pacificoText, color: COLORS.white, fontSize: 30 }}>AutoGuardian</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'center',
        paddingTop: Platform.OS === 'android' ? SIZES.statusbar_height + SIZES.padding : SIZES.padding,
        paddingVertical: SIZES.padding,
        backgroundColor: COLORS.background

    }
})

export default CustomHeader