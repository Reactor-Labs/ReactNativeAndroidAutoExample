import React, {useEffect, useState} from 'react';
import {useCarNavigation} from 'react-native-android-auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterEvents, filterEventDates} from '../utils';

const Events = () => {
  const navigation = useCarNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await AsyncStorage.getItem('list');
        if (value !== null) {
          // value previously stored
          setData(JSON.parse(value));
        }
        console.log(
          '🚀 ~ file: Events.js ~ line 17 ~ fetchData ~ value',
          value,
        );
      } catch (e) {
        console.log('🚀 ~ file: index.js ~ line 214 ~ getData ~ e', e);
        // error reading value
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setEventsList(filterEvents(data));
    }
  }, [data]);

  useEffect(() => {
    if (eventsList.length > 0) {
      setIsLoading(false);
    }
  }, [eventsList]);

  return (
    <list-template
      isLoading={isLoading}
      title={'Events'}
      headerAction="app_icon"
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
      {eventsList.map((item, index) => {
        const eventDates = filterEventDates(item.agendas);
        return (
          <item-list header={item.name} key={index}>
            <row
              key={item.id}
              title={item.header}
              texts={[eventDates.length > 0 ? eventDates[0].fullDate : '']}
              onPress={() => {
                navigation.push('routes', {
                  routeCollections: item.routeCollections,
                });
              }}
            />
          </item-list>
        );
      })}
    </list-template>
  );
};

export default Events;
