import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Screen, ScreenManager} from 'react-native-android-auto';
import Events from './screens/Events';
import Routes from './screens/Routes';
import RoutePreview from './screens/RoutePreview';

import {events} from './data';

const RootApp = () => {
  useEffect(() => {
    const setData = async () => {
      await AsyncStorage.setItem('list', JSON.stringify(events));
    };
    if (events.length !== 0) {
      setData();
    }
  }, []);

  return (
    <ScreenManager>
      <Screen name="root" render={Events} />
      <Screen name="routes" render={Routes} />
      <Screen name="routePreview" render={RoutePreview} />
    </ScreenManager>
  );
};

export default RootApp;
