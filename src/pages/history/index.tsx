import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import { getData } from '../../utils/store-retrieve-data'
import { FontAwesome5 } from '@expo/vector-icons';
import Map from '../../components/Map';

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

const HistoryCard = ({ fuelLevel, locations, rpm, speed, temperature }: IRide) => {
    const [showMap, setShowMap] = useState(false);

    return (
        <View style={{ borderRadius: 10, marginBottom: 10, padding: SIZES.padding, elevation: 2, backgroundColor: COLORS.white }}>
            <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                <View>
                    <Text style={styles.subtext}>Total Distance:</Text>

                    <Text style={styles.text3D}>{200}km</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.subtext}>Avg Speed:</Text>

                    <Text style={styles.text3D}>{200}km/hr</Text>
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.subtext}>Avg RPM:</Text>

                    <Text style={styles.text3D}>{200}RPM</Text>
                </View>

            </View>



            <TouchableOpacity
                onPress={() => setShowMap(!showMap)}
                style={{
                    alignItems: 'center'
                }}>
                <FontAwesome5 name={showMap ? "caret-up" : "caret-down"} size={20} color="black" />

            </TouchableOpacity>

            {showMap && <Map containerStyles={{ width: '100%', height: 200 }} startPosition={{
                longitude: locations[0].longitude,
                latitude: locations[0].latitude,
                longitudeDelta: 0.0009,
                latitudeDelta: 0.0009
            }} showsUserLocation={false} followsUserLocation={false} coords={locations}
            />}

        </View>
    )
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
                        <HistoryCard rpm={item.rpm} fuelLevel={item.fuelLevel} locations={item.locations} speed={item.speed} temperature={item.temperature} />
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
    },
    text3D: {
        ...commonStyles.spaceMono,
        fontSize: 16,
        textShadowColor: 'rgba(67, 67, 67, 0.56)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        color: "#034c13"
    },
    subtext: {
        ...commonStyles.boldText,
        fontSize: 11
    }
})
export default History