import moment from 'moment';
import last from 'lodash/last';

export const formatDate = date => {
  const agendaMonth = moment(parseInt(date)).format('MMM');
  let agendaDateFormat = 'MMM. D';
  if (agendaMonth === 'May') {
    agendaDateFormat = 'MMM D';
  }
  const parsedDate = moment(parseInt(date)).format(agendaDateFormat);
  return parsedDate;
};

export const filterEventDates = event => {
  if (event.length > 0) {
    const agendasList = event.map(item => {
      const {
        relationships: {days},
      } = item;
      const startDate = parseInt(days[0].attributes.date);
      const endDate = parseInt(last(days).attributes.date);

      let fullDate = formatDate(startDate);

      if (days.length > 1) {
        fullDate += ` - ${formatDate(endDate)}`;
      }
      return {
        startDate: startDate,
        endDate: endDate,
        fullDate: fullDate,
      };
    });
    return agendasList;
  }
  return [];
};

export const filterEvents = events => {
  if (events.length > 0) {
    const eventItems = events.map(item => {
      const {
        attributes: {name},
        views: {
          home: {
            relationships: {
              sections: {
                location: {
                  attributes: {header},
                },
              },
            },
          },
        },
        relationships: {agendas, routeCollections},
      } = item;
      return {
        id: item.id,
        name: name,
        agendas: agendas,
        header: header,
        routeCollections: routeCollections,
      };
    });
    return eventItems;
  }

  return [];
};
