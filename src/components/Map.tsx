import { View, Text, Animated, ViewStyle } from 'react-native'
import React from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { COLORS } from '../constants/theme'
import { FontAwesome5 } from '@expo/vector-icons';

interface IMap {
    containerStyles: ViewStyle;
    startPosition: {
        longitude: number;
        latitude: number;
        longitudeDelta: number;
        latitudeDelta: number;

    };
    showsUserLocation: boolean;
    followsUserLocation: boolean;
    coords: {
        longitude: number;
        latitude: number;
    }[];

    posAnimationStyle?: ViewStyle

}
const Map = ({ posAnimationStyle, containerStyles, startPosition, showsUserLocation, followsUserLocation, coords }: IMap) => {
    return (
        <MapView
            style={containerStyles}
            initialRegion={startPosition}
            showsUserLocation={showsUserLocation}
            followsUserLocation={followsUserLocation}
            region={startPosition}>

            <Marker
                coordinate={startPosition}
            >

                <View style={{ alignItems: "center", overflow: 'visible', justifyContent: 'flex-start', width: 60, height: 60, borderRadius: 70 }}>
                    <Animated.View style={{ borderWidth: 2, borderColor: 'red', width: 30, height: 30, borderRadius: 30, position: 'absolute', bottom: '10%', ...posAnimationStyle }} />
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
                coordinates={coords.map(pos => ({
                    latitude: pos.latitude,
                    longitude: pos.longitude
                }))}
                strokeWidth={5}
                strokeColor={COLORS['teal-001']}
            />



        </MapView>

    )
}

export default Map