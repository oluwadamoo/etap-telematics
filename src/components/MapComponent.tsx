import { View, StyleSheet, Animated, Easing, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import * as Location from 'expo-location';
import { COLORS, } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import haversine from "haversine";
import { Permission } from 'react-native';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

interface IMap {
    startedRide: boolean;
    setAvgSpeed: React.Dispatch<React.SetStateAction<number>>;
    setAvgRPM: React.Dispatch<React.SetStateAction<number>>;
    setCurrentRPM: React.Dispatch<React.SetStateAction<number>>;
    setCurrentLocation: React.Dispatch<React.SetStateAction<{
        longitude: number;
        latitude: number;
    }>>;
    setCurrentSpeed: React.Dispatch<React.SetStateAction<number>>;
    currentLocation: {
        longitude: number,
        latitude: number
    },
    rideLocations: {
        longitude: number,
        latitude: number
    }[],
    setRideLocations: React.Dispatch<React.SetStateAction<{
        longitude: number;
        latitude: number;
    }[]>>
}
const MapComponent = ({ setCurrentRPM, rideLocations, setRideLocations, startedRide, currentLocation, setCurrentLocation, setCurrentSpeed, setAvgRPM, setAvgSpeed }: IMap) => {
    const animatedOpacity = new Animated.Value(0);
    const [speeds, setSpeeds] = useState<number[]>([])
    const [rpms, setRpms] = useState<number[]>([])

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [startPosition, setStartPosition] = useState<{
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number
    } | null>(null);



    Animated.loop(
        Animated.timing(animatedOpacity, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        })

    ).start();



    const getAvg = (numbers: number[]) => {
        if (numbers.length === 0) {
            return 0;
        }
        const sum = numbers.reduce((total, num) => total + num, 0);
        const average = sum / numbers.length;
        return average;
    }

    const startLocationTracking = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({
            timeInterval: 100,
            accuracy: Location.Accuracy.BestForNavigation
        })

        const { latitude, longitude } = location.coords

        if (!startPosition) {
            setCurrentLocation({
                longitude,
                latitude
            })
            setStartPosition({
                longitude,
                latitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        }
        setLocation({
            longitude, latitude
        })

        if (!startedRide && rpms.length && speeds.length) {

            setAvgRPM(getAvg(rpms))
            setAvgSpeed(getAvg(speeds))
        }

        if (startedRide && !rideLocations.some(pos => pos.latitude === latitude && pos.longitude === longitude)) {
            setCurrentLocation({ latitude, longitude })
            setRideLocations(prev => [...prev, { latitude, longitude }]);
            setCurrentSpeed(location.coords.speed!)
            const rpm = getRPM({ latitude, longitude, speed: location.coords.speed! })
            setCurrentRPM(rpm)
            setRpms((prev) => [...prev, rpm])
            setSpeeds((prev) => [...prev, location.coords.speed!])
        }
    };

    const calculateDistance = ({ latitude, longitude }: { longitude: number, latitude: number }) => {

        return haversine(currentLocation, { latitude, longitude }) || 0;

    }


    const getRPM = ({ latitude, longitude, speed }: { longitude: number, latitude: number, speed: number }) => {
        const distance = calculateDistance({ latitude, longitude })
        const time = distance / speed;

        return (1 / time) * 60 * 1;
    }

    useEffect(() => {
        startLocationTracking()

    }, [location, startedRide])




    return (
        <View style={styles.container}>
            {
                startPosition &&
                <MapView
                    style={styles.map}
                    initialRegion={startPosition}
                    showsUserLocation={startedRide}
                    followsUserLocation={startedRide}
                    region={startPosition}>

                    <Marker
                        coordinate={startPosition}
                    >

                        <View style={{ alignItems: "center", overflow: 'visible', justifyContent: 'flex-start', width: 60, height: 60, borderRadius: 70 }}>
                            <Animated.View style={{ borderWidth: 2, opacity: animatedOpacity, borderColor: 'red', width: 30, height: 30, borderRadius: 30, position: 'absolute', bottom: '10%', }} />
                            <View
                                style={{
                                    backgroundColor: COLORS.white
                                }}
                            >
                                <FontAwesome5 name="map-pin" size={35} color={COLORS.red} />

                            </View>
                        </View>


                    </Marker>

                    <Polyline
                        coordinates={rideLocations.map(pos => ({
                            latitude: pos.latitude,
                            longitude: pos.longitude
                        }))}
                        strokeWidth={5}
                        strokeColor={COLORS['teal-001']}
                    />



                </MapView>

            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})


export default MapComponent