import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DiaryList, Diary, FeelStat } from "../screens/TabScreens";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="목록"
            tabBarOptions={{
                labelPosition: 'beside-icon',
                style: {
                    backgroundColor: '#111111',
                },
                activeTintColor: '#fa5672',
                inactiveTintColor: '#542330',
            }}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { 
                    backgroundColor: '#fdc2be',
                    borderTopWidth: 2,
                    borderTopColor: '#ffffff',
                },
            }}
        >
            <Tab.Screen
                name="목록"
                component={DiaryList}
                options={{
                    tabBarIconStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="일기장"
                component={Diary}
                options={{
                    tabBarIconStyle: { display: "none" },
                }}
            />
            <Tab.Screen
                name="기분 통계"
                component={FeelStat}
                options={{
                    tabBarIconStyle: { display: "none" },
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;