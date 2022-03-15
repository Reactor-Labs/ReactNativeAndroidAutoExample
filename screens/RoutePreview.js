import React, {useEffect, useState} from 'react';
import {useCarNavigation} from 'react-native-android-auto';

const RoutePreview = ({routeParams}) => {
  const navigation = useCarNavigation();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <navigation-screen
      isLoading={isLoading}
      title="Route Preview"
      headerAction="back"
      notification={false}
      actionStrip={{
        actions: [
          {
            type: 'action',
            title: 'Back',
            onPress: () => {
              console.log('pressed');
              navigation.pop();
            },
          },
        ],
      }}>
      <row
        title="Test Route"
        texts={['Hello world Route', 'text 2']}
        key={1}
        type="place"
        metadata={{
          type: 'waypoints',
          type2: 'waypoints',
          waypoints: routeParams.drivingRoute.waypoints,
          destination: routeParams.drivingRoute.destination,
          offroad: routeParams.drivingRoute.offroad,
        }}
      />
    </navigation-screen>
  );
};

export default RoutePreview;
