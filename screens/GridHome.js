import React, {useEffect, useState} from 'react';
import {useCarNavigation} from 'react-native-android-auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterEvents, filterEventDates} from '../utils';

const GridHome = () => {
  const navigation = useCarNavigation();
  const [data, setData] = useState([]);

  return (
    <grid-template
      isLoading={false}
      title={'Home'}
      headerAction="app_icon"
      >
      <item-list header="Events" key="0">
                  <row
                    key="0"
                    title="Events"
                    icon="events" // for R.drawable.events
                    onPress={() => {
                      console.log('🚀 ~ GridHome.js - onPress ~ Events');
                      navigation.push('events');
                    }}
                  />
                  <row
                      key="1"
                      title="Other"
                      texts="example text"
                      icon="default_icon" // for R.drawable.default_icon
                      onPress={() => {
                        console.log('🚀 ~ GridHome.js - onPress ~ Other');
                        navigation.push('events');
                      }}
                    />
      </item-list>
    </grid-template>
  );
};

export default GridHome;
