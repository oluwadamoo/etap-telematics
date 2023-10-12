import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SIZES, commonStyles } from '../../constants/theme'
import { getData } from '../../utils/store-retrieve-data'

interface IRide {
    fuelLevel: number,
    locations: {
        longitude: number,
        latitude: number
    }[],
    rpm: number,
    speed: number,
    temperature: number
}
const History = () => {
    const [rides, setRides] = useState<IRide[]>([])
    const getMyRides = async () => {
        const myRides = await getData({ key: "@rides" })

        if (myRides) {
            setRides(JSON.parse(myRides))
        }

    }

    useEffect(() => {
        getMyRides()
    }, [])
    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            <View style={styles.container}>
                <FlatList
                    data={rides}
                    keyExtractor={(_, index) => `${index}`}
                    renderItem={({ item }) => (
                        <View style={{ backgroundColor: '#fff' }}>
                            <Text>{item.fuelLevel}</Text>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: SIZES.padding,
        flex: 1
    }
})
export default History