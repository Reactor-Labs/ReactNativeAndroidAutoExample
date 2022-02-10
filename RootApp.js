import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Screen, ScreenManager, AndroidAutoModule} from 'react-native-android-auto';
import GridHome from './screens/GridHome';
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

    useEffect(() => {
        function onConnect() {
            console.log("onConnect event called")
            // Do things now that AA is connected
        }

        function onDisconnect() {
            console.log("onDisconnect event called")
            // Do things now that AA is disconnected
        }

        AndroidAutoModule.eventEmitter.addListener("android_auto:connect", () => {
            console.log("AndroidAutoModule.eventEmitter: connect");
            onConnect()
        });

        AndroidAutoModule.eventEmitter.addListener("android_auto:disconnect", () => {
            console.log("AndroidAutoModule.eventEmitter: disconnect");
            onDisconnect()
        });

        // Force refresh current AndroidAuto state - trigger an event
        AndroidAutoModule.getState()

        return () => {};
    });

  return (
    <ScreenManager>
      <Screen name="root" render={GridHome} />
      <Screen name="events" render={Events} />
      <Screen name="routes" render={Routes} />
      <Screen name="routePreview" render={RoutePreview} />
    </ScreenManager>
  );
};

export default RootApp;
