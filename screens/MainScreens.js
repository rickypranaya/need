import * as React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import Home from './Main/Home';
import Activity from './Main/Activity';
import Message from './Main/Message/Message';
import Account from './Main/Account';
import Constant from '../components/Constants';
import CreateNeed from './Main/Create/CreateNeed';
import GetLocation from './Main/Create/GetLocation';
import History from './Main/History';
import ChatRoom from './Main/Message/ChatRoom';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainScreen() {

    const Tabs =()=>{
        return(
            <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                let type;
                let iconSize;

                if (route.name === 'Home') {
                    if (iconName = focused){
                        iconName = 'home'
                        type = 'material'
                        iconSize = 27
                    } else {
                        iconName = 'home'
                        type = 'simple-line-icon'
                        iconSize =20
                    }
                } else if (route.name === 'Activity') {
                    if (iconName = focused){
                        iconName = 'file-text'
                        type = 'font-awesome'
                        iconSize = 20
                    } else {
                        iconName = 'file-text-o'
                        type = 'font-awesome'
                        iconSize =20
                    }
                } else  if (route.name === 'Create') {
                    if (iconName = focused){
                        iconName = 'add-circle-sharp'
                        type = 'ionicon'
                        iconSize = 27
                    } else {
                        iconName = 'add-circle-outline'
                        type = 'ionicon'
                        iconSize =27
                    }
                } else if (route.name === 'Message') {
                    if (iconName = focused){
                        iconName = 'chatbox'
                        type = 'ionicon'
                        iconSize = 25
                    } else {
                        iconName = 'chatbox-outline'
                        type = 'ionicon'
                        iconSize = 25
                    }
                } else  {
                    if (iconName = focused){
                        iconName = 'person-circle'
                        type = 'ionicon'
                        iconSize = 27
                    } else {
                        iconName = 'person-circle-outline'
                        type = 'ionicon'
                        iconSize =27
                    }
                }

                // You can return any component that you like here!
                return <Icon
                // reverse
                name={iconName}
                type={type}
                color={color}
                size={iconSize}
                />;
                },
            })}
            tabBarOptions={{
                activeTintColor: Constant.PRIMARY_COLOR,
                inactiveTintColor: '#676767',
                // showLabel: false
            }}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Activity" component={Activity} />
                <Tab.Screen name="Create" component={CreateNeed} 
                options={{
                    tabBarVisible:false,
                    unmountOnBlur :true,
            //     // tabBarLabel: '',
               //tabBarAccessibilityLabel: 'hehe',
                // tabBarIcon: ({ color }) => (
                //     <TouchableOpacity 
                //     style={{backgroundColor:'yellow', width:'100%', height:'100%', justifyContent:'center'}} 
                //     onPress={()=>{navigation.navigate('createNeed')}}>
                //         <Icon
                //         // reverse
                //         name='add-circle-outline'
                //         type='ionicon'
                //         color={color}
                //         size= {27}
                //         />
                //         {/* <Text> Create</Text> */}
                //     </TouchableOpacity>
                // )
                    
                }}
            />
                <Tab.Screen name="Message" component={Message} />
                <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
        )
    }

  return (
    <NavigationContainer>
       <Stack.Navigator >
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="getLocation" component={GetLocation} options={{ headerShown: false }} />
        <Stack.Screen name="history" component={History} options={{ headerShown: false }} />
        <Stack.Screen name="chatRoom" component={ChatRoom} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}