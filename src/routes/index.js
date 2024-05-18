import { NavigationContainer } from '@react-navigation/native';

import TabRoutes from './tab.routs';

export default function Routes() {
    return (
        <NavigationContainer>
            <TabRoutes />
        </NavigationContainer>
    )
}