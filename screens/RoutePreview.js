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
    <route-preview-navigation-screen
      isLoading={isLoading}
      title="Route Preview"
      headerAction="back"
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
          type: 'place',
          latitude: routeParams.drivingRoute.latitude,
          longitude: routeParams.drivingRoute.longitude,
        }}
      />
    </route-preview-navigation-screen>
  );
};

export default RoutePreview;
