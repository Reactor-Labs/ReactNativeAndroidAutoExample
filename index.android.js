import React from 'react';
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {
  render,
  Screen,
  ScreenManager,
  useCarNavigation,
} from 'react-native-android-auto';

const Route = () => {
  return (
    <place-list-map-template title="Route">
      <row
        title="Test Route"
        texts={['Hello world Route', 'text 2']}
        key={1}
        metadata={{
          type: 'place',
          latitude: 47.497913,
          longitude: 19.040236,
        }}
      />
    </place-list-map-template>
  );
};

const Routes = () => {
  const shop = {name: 'test'};
  const navigation = useCarNavigation();
  return (
    <list-template title={shop.name ?? 'Shopify Local Delivery'}>
      <item-list header="Delivery Lists">
        <row
          key={1}
          title="Test title"
          texts={['Hello world']}
          onPress={() => {
            console.log('pressed');
            navigation.pop();
          }}
        />
      </item-list>
    </list-template>
  );
};

const Main = () => {
  const navigation = useCarNavigation();
  return (
    <pane-template title="Dashboard AE" isLoading={false} headerAction="back">
      <row key={1} title="Test title Pane" texts={['Hello world']} />
      <row key={2} title="Test title Pane 02" texts={['Hello world row 2']} />
      <action
        title="test action with color"
        texts={['action 1']}
        backgroundColor={'red'}
        onPress={() => {
          console.log('pressed');
          navigation.push('routes', {
            deliveryList: [],
          });
        }}
      />
      <action
        title="action 2"
        texts={['action 2', 'action 2 line 2']}
        backgroundColor={'red'}
        onPress={() => {
          console.log('pressed');
          navigation.push('route', {
            deliveryList: [],
          });
        }}
      />
    </pane-template>
  );
};

const RootApp = () => {
  return (
    <ScreenManager>
      <Screen name="root" render={Main} />
      <Screen name="routes" render={Routes} />
      <Screen name="route" render={Route} />
    </ScreenManager>
  );
};

AppRegistry.registerRunnable('androidAuto', () => {
  render(React.createElement(RootApp));
});

AppRegistry.registerComponent(appName, () => App);
