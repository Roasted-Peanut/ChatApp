import { Navigation } from "react-native-navigation";
import {registerScreens} from './src/navigation/routes';
import setup from "./src/store/setup";


Navigation.events().registerAppLaunchedListener( async () => {
    const store = setup();
    registerScreens(store);
    Navigation.setRoot({
    root:{
        component:{
            name:'HomeAuth'
        }
    } 
})
});