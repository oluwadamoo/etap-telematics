import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./root.navigation";

interface HandlerProps {
  onReady: () => void
}
export const NavigationHandler = ({ onReady }: HandlerProps) => {

  return (
    <NavigationContainer onReady={onReady}>
      <RootNavigation />
    </NavigationContainer>
  )
}
