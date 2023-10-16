import { View, Text, StyleSheet, SafeAreaView, Platform, ScrollView, FlatList, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { COLORS, SIZES, commonStyles } from '../../constants/theme'
import MapComponent from '../../components/MapComponent'
import MetricComponent from '../../components/MetricComponent'
import { getData, storeData } from '../../utils/store-retrieve-data'
import { getAvg } from '../../utils/calculate-metric'




interface IMenu {
    startRide: () => void;
    startedRide: boolean;
    currentLocation: {
        longitude: number,
        latitude: number
    };
    currentSpeed: number;
    currentRPM: number;
    currentTemp: number;
    currentFuelLevel: number;
}
const MetricsMenu = ({ startRide, startedRide, currentLocation, currentRPM, currentSpeed, currentTemp, currentFuelLevel }: IMenu) => {
    const [footerHeight, setFooterHeight] = useState(100);


    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
            const newHeight = Math.max(50, footerHeight - gestureState.dy);
            setFooterHeight(newHeight);
        },
    });


    return (
        <View style={[styles.metrics, {
            height: footerHeight,

        }]}
            {...panResponder.panHandlers}
        >
            <TouchableOpacity style={{ width: 50, height: 4, backgroundColor: COLORS.gray, alignSelf: 'center', borderRadius: 5, marginBottom: SIZES.padding }} />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <MetricComponent
                    containerStyles={{
                        marginRight: -10
                    }}
                    maxValue={200}
                    title='Temperature'
                    type='temperature'
                    value={currentTemp}
                    symbol=' °C'
                />
                <MetricComponent
                    containerStyles={{
                        marginRight: -10
                    }}

                    maxValue={180}
                    title='Speed'
                    type='speed'
                    value={parseFloat(currentSpeed.toFixed(2))}
                    symbol=' Km/Hr'
                />
                <MetricComponent
                    maxValue={100}
                    title='Fuel level'
                    type='fuel'
                    value={currentFuelLevel}
                    symbol='%'
                />

                <MetricComponent
                    containerStyles={{
                        width: 130,
                        marginTop: 15
                    }}
                    maxValue={20}
                    size={130}
                    title='Speed'
                    type='rpm'
                    value={parseFloat(currentRPM.toFixed(2))}
                    symbol=' RPM'
                />

                <View style={{ marginLeft: SIZES.padding, justifyContent: "center" }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text style={{ ...commonStyles.boldText, fontSize: 14.5 }}>lat:</Text>
                        <View style={styles.locationTextCont}>
                            <Text style={styles.locationText}>{currentLocation.latitude.toFixed(3)}</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: COLORS.gray, marginVertical: 10 }} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...commonStyles.boldText, fontSize: 14.5 }}>long:</Text>
                        <View style={{
                            paddingHorizontal: 10,
                            backgroundColor: '#a2a2a2',
                            borderRadius: 5,
                            marginLeft: 4,

                        }}>
                            <Text style={styles.locationText}>{currentLocation.longitude.toFixed(3)}</Text>
                        </View>
                    </View>
                </View>

            </View>


            <TouchableOpacity style={{ ...styles.button, backgroundColor: startedRide ? COLORS.red : COLORS['teal-001'] }}
                onPress={startRide}

            >
                <Text style={{ ...commonStyles.boldText, color: COLORS.white }}>{startedRide ? "End" : "Begin"} Ride</Text>
            </TouchableOpacity>
        </View>
    )
}
const Home = () => {
    const [startedRide, setStartedRide] = useState(false)
    const [currentSpeed, setCurrentSpeed] = useState(0)
    const [currentRPM, setCurrentRPM] = useState(0)
    const [currentTemp, setCurrentTemp] = useState(0)
    const [currentFuelLevel, setCurrentFuelLevel] = useState(0)
    const [avgSpeed, setAvgSpeed] = useState(0)
    const [avgRPM, setAvgRPM] = useState(0)
    const [speeds, setSpeeds] = useState<number[]>([])
    const [rpms, setRpms] = useState<number[]>([])


    const [rideLocations, setRideLocations] = useState<{
        longitude: number,
        latitude: number
    }[]>([])

    const [currentLocation, setCurrentLocation] = useState({
        longitude: 0,
        latitude: 0
    })

    const saveRide = async () => {

        setAvgRPM(getAvg(rpms))
        setAvgSpeed(getAvg(speeds))

        let formerData = await getData({ key: "@rides" })
        if (formerData) {
            formerData = JSON.parse(formerData)
        }
        const data = {
            rpm: avgRPM,
            fuelLevel: currentFuelLevel,
            locations: rideLocations,
            temperature: currentTemp,
            speed: avgSpeed
        }

        let newData = []
        if (formerData) {
            newData = [...formerData, data]
        } else {
            newData = [data]
        }
        await storeData({ key: "@rides", value: JSON.stringify(newData) })
        setAvgRPM(0)
        setAvgSpeed(0)
        setCurrentFuelLevel(100)
        setCurrentRPM(0)
        setCurrentSpeed(0)
        setCurrentTemp(0)
        setRideLocations([])
        setSpeeds([])
        setRpms([])


    }

    const startRide = () => {
        if (startedRide) {
            setStartedRide(false)
            saveRide()
        } else {
            setStartedRide(true)
        }
    }


    return (
        <SafeAreaView style={commonStyles.screenWrapper}>
            <View style={styles.container}>

                <MapComponent setSpeeds={setSpeeds} setRpms={setRpms} setAvgRPM={setAvgRPM} setAvgSpeed={setAvgSpeed} rideLocations={rideLocations} setRideLocations={setRideLocations} startedRide={startedRide} setCurrentLocation={setCurrentLocation} setCurrentSpeed={setCurrentSpeed} currentLocation={currentLocation} setCurrentRPM={setCurrentRPM} />

                <MetricsMenu startRide={startRide} startedRide={startedRide} currentLocation={currentLocation} currentSpeed={currentSpeed} currentRPM={currentRPM} currentTemp={currentTemp} currentFuelLevel={currentFuelLevel} />
            </View>

        </SafeAreaView>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        flex: 1
    },
    metrics: {
        width: '100%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: '#BDBDBD',
        marginTop: 'auto',
        paddingVertical: SIZES.padding,
        paddingHorizontal: SIZES.padding / 2
    },
    map: {
        flex: 1,
        height: 300,
        width: '100%'
    },
    button: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        alignSelf: "center",
        height: 45,
        borderRadius: 10,
        backgroundColor: COLORS['teal-001'],
        alignItems: "center",
        justifyContent: 'center',
        width: '100%',
        marginTop: 'auto'

    },
    locationText: {
        ...commonStyles.spaceMono,
        textAlign: 'center',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.731)',
        textShadowOffset: { width: 2, height: 1.5 },
        textShadowRadius: 5,
        color: 'white'
    },
    locationTextCont: {

        paddingHorizontal: 10,
        backgroundColor: '#a2a2a2',
        borderRadius: 5,
        marginLeft: 'auto',

    }
})


export default Home