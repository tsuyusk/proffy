import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen component={Landing} name="Landing" />
        <Screen component={GiveClasses} name="GiveClasses" />
        <Screen component={StudyTabs} name="Study" />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
