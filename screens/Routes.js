import React, {useEffect, useState} from 'react';
import {useCarNavigation} from 'react-native-android-auto';

const Routes = ({routeParams}) => {
  const navigation = useCarNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navigateToRoute = route => {
    const {
      attributes: {end, name, mileDistance, routeTime, directionsCount},
      relationships: {waypoints},
    } = route;

    const [startLong, startLat] = waypoints[0].data.geometry.coordinates;
    const [endLong, endLat] =
      waypoints[waypoints.length - 1].data.geometry.coordinates;
    console.log('🚀 ~ file: index.js ~ line 123 ~ Routes ~ endLong', endLong);

    navigation.push('routePreview', {
      drivingRoute: {latitude: endLat, longitude: endLong, waypoints: waypoints, destination: end},
    });
  };

  return (
    <list-template
      title={'Routes'}
      isLoading={isLoading}
      headerAction="back"
      actionStrip={{
        actions: [
          {
            type: 'action',
            title: 'Back',
            onPress: () => {
              navigation.pop();
            },
          },
        ],
      }}>
      {routeParams.routeCollections.map((item, index) => {
      console.log('🚀 ~ Routes.js - item ~ ', item);
        return (
          <item-list header={item.attributes.title} key={item.id}>
            {item.relationships.routes.map((route, index) => {
              const mileDistance = route.attributes.mileDistance;
              const directionsCount = route.attributes.directionsCount;
              const routeTime = route.attributes.routeTime;
              return (
                <row
                  key={route.id}
                  title={route.attributes.name}
                  texts={[
                    `${mileDistance} Miles - ${directionsCount} directions`,
                    `${routeTime} minutes`,
                  ]}
                  onPress={() => {
                    navigateToRoute(route);
                  }}
                />
              );
            })}
          </item-list>
        );
      })}
    </list-template>
  );
};

export default Routes;
