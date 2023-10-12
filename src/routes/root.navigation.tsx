import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "./bottom.navigation";


const RootStack = createNativeStackNavigator()
const RootNavigation = () => {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <RootStack.Screen name="BottomTab" component={BottomNavigation} />
        </RootStack.Navigator>
    );
}

export default RootNavigation