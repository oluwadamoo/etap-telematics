import { View, Text, SafeAreaView, StyleSheet, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Text as SvgText } from 'react-native-svg'
import Speedometer, { Arc, Background, DangerPath, Indicator, Marks, Needle, Progress } from 'react-native-cool-speedometer';
import { COLORS, commonStyles } from '../constants/theme';
import { FontAwesome5 } from '@expo/vector-icons';

interface IMetric {
    maxValue: number;
    size?: number;
    value: number;
    title: string;
    symbol: string;
    type?: 'speed' | 'temperature' | 'rpm' | 'fuel';
    labels?: {
        name: string,
        labelColor: string,
        activeBarColor: string
    }[],
    containerStyles?: ViewStyle
}
const MetricComponent = ({ type, symbol, maxValue, size, value, title, labels, containerStyles }: IMetric) => {
    return (
        <View style={containerStyles}>
            {type === 'speed' || type === 'rpm' ?
                <Speedometer
                    value={value}
                    width={size ? size : 200}
                    max={maxValue ? maxValue : 180}
                >
                    <Background
                    />
                    <Arc />
                    <Needle />
                    <Progress />
                    <Marks />
                    <DangerPath />
                    <Indicator fixValue={false}  >
                        {(_, textProps) => (
                            type === "rpm" ? <SvgText
                                {...textProps}
                                fontSize={13}
                                fontWeight={700}
                                fill={COLORS.white}
                                x={size! / 2}
                                y={114}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                (x2500)
                            </SvgText> : <SvgText />
                        )}
                    </Indicator>
                </Speedometer>
                :

                <Speedometer
                    value={20}
                    max={100}

                    angle={360}
                    width={80}
                    lineCap="round"
                    accentColor={value <= 30 ? "green" : value <= 60 ? "orange" : "red"}
                >
                    <Arc arcWidth={10} />
                    <Progress arcWidth={10} />
                    <Indicator fixValue={false}>
                        {(value, textProps) => (
                            <SvgText
                                {...textProps}
                                fontSize={15}
                                fontWeight={700}
                                x={80 / 2 - 5}
                                y={80 / 2}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                            >
                                {value}{symbol}
                                <View style={{ position: 'absolute', top: 49, right: '45%', opacity: 0.5 }}>
                                    <FontAwesome5 name={type === 'fuel' ? "gas-pump" : "thermometer-full"} size={15} color="#6d6c6c" />
                                </View>
                            </SvgText>
                        )}
                    </Indicator>
                </Speedometer>
            }
            {type === 'speed' && <Text style={{ ...commonStyles.boldText, fontSize: 25, textAlign: 'center' }}>{value} km/hr</Text>}
            {type === 'rpm' && <Text style={{ ...commonStyles.boldText, fontSize: 15, textAlign: 'center' }}>{value} rpm</Text>}

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

});
export default MetricComponent