import React from 'react';
import { months } from '../../utils/date';

const MonthSelector = ({selectedMonth, selectMonthHandler}) => {
    return (
        <div className="month-selector">
            {months.map((month, i) => {
                return (
                    <span
                        key={month}
                        onClick={() => selectMonthHandler(i)}
                        className={`selectable-month ${i === selectedMonth ? "selected-month" : ""
                            }`}
                    >
                        {month}
                    </span>
                );
            })}
        </div>
    )
}
export default MonthSelector;