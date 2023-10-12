import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/home";
import History from "../pages/history";
import { StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from "../constants/theme";
import CustomHeader from "../components/CustomHeader";

const BottomTabs = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <BottomTabs.Navigator

            screenOptions={{
                tabBarHideOnKeyboard: true,
                // headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    ...styles.tabBarContainer
                }
            }}


        >
            <BottomTabs.Screen
                name="Home"
                component={Home}
                options={{
                    header() {
                        return <CustomHeader />
                    },
                    tabBarIcon({ focused }) {
                        return <FontAwesome5 name="home" size={24} color={focused ? COLORS["teal-001"] : COLORS.gray} />
                    },
                }}

            />
            <BottomTabs.Screen
                name="History"
                component={History}
                options={{
                    header() {
                        return <CustomHeader />
                    },

                    tabBarIcon({ focused }) {
                        return <FontAwesome5 name="history" size={24} color={focused ? COLORS["teal-001"] : COLORS.gray} />
                    },
                }}
            />
        </BottomTabs.Navigator>
    )
}


const styles = StyleSheet.create({
    tabBarContainer: {
        minHeight: 90,
        backgroundColor: COLORS["lighter-background"]
    }
})
export default BottomNavigation