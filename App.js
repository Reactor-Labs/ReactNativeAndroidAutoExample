import React, {useCallback} from 'react';
import {StyleSheet, Alert, View, Linking, Button, Platform} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const handlePress = useCallback(async url => {
    // callback
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  return (
    <View style={[styles.container, styles.centeredContent]}>
      <Button
        onPress={() =>
          handlePress(
            'https://www.google.com/maps/dir/?api=1&origin=Paris%2CFrance&destination=Cherbourg%2CFrance&travelmode=driving&waypoints=Palace+of+Versailles%7CChartres+Cathedral%7CCathedral+of+Saint+Julian+of+Le+Mans%7CCaen+Castle',
          )
        }
        title="Naviagate"
        color="#841584"
        accessibilityLabel="Navigate with Google Maps"
      />
    </View>
  );
};

export default App;
