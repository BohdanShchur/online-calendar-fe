import React, { useState } from 'react';

import { checkDateIsEqual, checkIsToday } from '../../utils/helpers/date';
import { useCalendar } from './hooks/useCalendar';
import Day from './Day';
import './Calendar.css';
import { useGetEvents } from './hooks/useGetEvents';
import { Button, Grid, CircularProgress, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import EventDialog from '../events';

const Calendar = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2
}) => {
  const [open, setOpen] = useState(false);
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleOpen = (event, mode) => {
    setOpen(true);
    setEvent(event);
    setIsEdit(mode);
  };
  const handleClose = () => setOpen(false);

  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber
  });
  console.log(state);
  const { loading, events, error, refetch } = useGetEvents(state.calendarDays);

  return (
    <>
      <EventDialog open={open} handleClose={handleClose} day={date} event={event} isEdit={isEdit} refetch={refetch} />
      <div className='calendar'>
        <div className='calendar__header'>
          <div className='calendar__header_pick_date'>
            <ArrowBackIosIcon
              aria-hidden
              // className='calendar__header__arrow__left'
              onClick={() => functions.onClickArrow('left')}
            />
            {state.mode === 'days' && (
              <div aria-hidden onClick={() => functions.setMode('monthes')}>
                {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
              </div>
            )}
            {state.mode === 'monthes' && (
              <div aria-hidden onClick={() => functions.setMode('years')}>
                {state.selectedYear}
              </div>
            )}
            {state.mode === 'years' && (
              <div>
                {state.selectedYearsInterval[0]} -{' '}
                {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
              </div>
            )}
            <ArrowForwardIosIcon
              aria-hidden
              onClick={() => functions.onClickArrow('right')}
            />
          </div>
          <div className='calendar__header_user_settings'>
            <Button onClick>
              <SettingsIcon fontSize='medium' />
            </Button>
          </div>
        </div>
        <div className='calendar__body'>
          {state.mode === 'days' && (
            <>
              <div className='calendar__week__names'>
                {state.weekDaysNames.map((weekDaysName) => (
                  <div key={weekDaysName.dayShort}>{weekDaysName.day}</div>
                ))}
              </div>
              <Grid
                container
                item
                columns={7}
                height={100}
                className='calendar__days'
              >
                {events.map((day) => {
                  const isToday = checkIsToday(day.dayInfo.date);
                  const isSelectedDay = checkDateIsEqual(day.dayInfo.date, state.selectedDay.date);
                  const isAdditionalDay = day.dayInfo.monthIndex !== state.selectedMonth.monthIndex;
                  return (
                    <Grid
                      item
                      xs={1}
                      key={`${day.dayInfo.dayNumber}-${day.dayInfo.monthIndex}`}
                      aria-hidden
                      onClick={() => {
                        functions.setSelectedDay(day.dayInfo);
                        selectDate(day.dayInfo.date);
                      }}
                      className={[
                        'calendar__day',
                        isToday ? 'calendar__today__item' : '',
                        isSelectedDay ? 'calendar__selected__item' : '',
                        isAdditionalDay ? 'calendar__additional__day' : ''
                      ].join(' ')}
                    >
                      <Day day={day.dayInfo} events={day.events} handleCreate={(date, mode) => handleOpen(date, mode)} />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          {state.mode === 'monthes' && (
            <div className='calendar__pick__items__container'>
              {state.monthesNames.map((monthesName) => {
                const isCurrentMonth =
                  new Date().getMonth() === monthesName.monthIndex &&
                  state.selectedYear === new Date().getFullYear();
                const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                return (
                  <Grid
                    key={monthesName.month}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedMonthByIndex(monthesName.monthIndex);
                      functions.setMode('days');
                    }}
                    className={[
                      'calendar__day',
                      'calendar__pick__item',
                      isSelectedMonth ? 'calendar__selected__item' : '',
                      isCurrentMonth ? 'calendar__today__item' : ''
                    ].join(' ')}
                  >
                    <div className='month'>
                      {monthesName.month}
                    </div>
                  </Grid>
                );
              })}
            </div>
          )}

          {state.mode === 'years' && (
            <div className='calendar__pick__items__container'>
              <div className='calendar__unchoosable__year'>{state.selectedYearsInterval[0] - 1}</div>
              {state.selectedYearsInterval.map((year) => {
                const isCurrentYear = new Date().getFullYear() === year;
                const isSelectedYear = year === state.selectedYear;

                return (
                  <div
                    key={year}
                    aria-hidden
                    onClick={() => {
                      functions.setSelectedYear(year);
                      functions.setMode('monthes');
                    }}
                    className={[
                      'calendar__pick__item',
                      isCurrentYear ? 'calendar__today__item' : '',
                      isSelectedYear ? 'calendar__selected__item' : ''
                    ].join(' ')}
                  >
                    {year}
                  </div>
                );
              })}
              <div className='calendar__unchoosable__year'>
                <div className='years'>
                  {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;