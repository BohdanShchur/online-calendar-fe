import React from 'react';
import Day from './Day';
import { firstDayOfMonth } from '../../utils/date';

const DaysOfMonth = ({ daysLength, month, now }) => {
    const days = Array.from({ length: daysLength }, (k, v) => {
        // if(v%5 === 0 ) return ({
        //     day: v + 1,
        //     events:[]
        // })
        return ({
            day: v + 1,
            events: [
                {
                    title: "title"
                },
                // {
                //     title: "title2"
                // },
                // {
                //     title: "title2"
                // },
                // {
                //     title: "title2"
                // }
            ]
        })
    });
    const dayToBeginTheMonthFrom = firstDayOfMonth(month);
    const currentDate = now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };
    return days.map((day, i) => {
        return (
            <span
                key={i}
                className={`day ${i === 0 ? "first-day" : ""}
              ${day.day === currentDate ? "today" : ""}
              ${day.events.length > 2 ? "hiddenEvent" : ""}
              ${(i + dayToBeginTheMonthFrom) % 7 === 0 ||
                        (i + dayToBeginTheMonthFrom) % 7 === 6
                        ? "holiday"
                        : ""
                    }
              `}
                style={i === 0 ? style : {}}
            >
                <Day day={day} />
            </span>
        );
    });
}

export default DaysOfMonth;