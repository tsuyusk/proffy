import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Favourites from '../pages/Favourites';
import TeacherList from '../pages/TeacherList';

const { Navigator, Screen } = createBottomTabNavigator();

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacitty: 0,
          height: 64,
        },
        tabStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconStyle: {
          flex: 0,
          width: 20,
          height: 20,
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 16,
        },
        inactiveBackgroundColor: '#fafafc',
        activeBackgroundColor: '#ebebf5',
        inactiveTintColor: '#c1bccc',
        activeTintColor: '#32264d',
      }}
    >
      <Screen
        component={TeacherList}
        name="TeacherList"
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-easel" color={color} size={size} />
          ),
        }}
      />
      <Screen
        component={Favourites}
        name="Favourites"
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-heart" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
};

export default StudyTabs;
