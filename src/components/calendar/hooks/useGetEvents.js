import { gql, useQuery } from "@apollo/client";
import { checkDateIsEqual } from "../../../utils/helpers/date";

const query = gql`
query GetEventsByUserId($filter: EventFilterInput) {
    getEventsByUserId(filter: $filter) {
      _id
      title
      description
      eventTimeRange {
        start
        end
      }
      notificationTime
    }
  }
`
export const useGetEvents = (calendarDays) => {
    const filter = {
        start: calendarDays[0].date.toISOString(),
        end: calendarDays[calendarDays.length - 1].date.toISOString()
    }
    const {loading, data, error} = useQuery(query, {
        variables: {
            filter
        }
    });
    let events = [];
    if(!loading) {
        events = calendarDays.map(day => {
            let array = [];
            for (const event of data.getEventsByUserId) {
                if(checkDateIsEqual(day.date, new Date(event.eventTimeRange.start))) {
                    array.push(event);
                }
            }
            return({dayInfo: day, events: array})
        });
    }
    return {loading, events, error};
};
