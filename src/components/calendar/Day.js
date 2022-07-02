import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import { Button, Card, CardContent, CardHeader, Menu, MenuItem, Paper } from '@mui/material';
import { EventsPopover } from './EventsPopover';

import { MoreHoriz } from '@mui/icons-material';
const Day = ({ day, events, handleCreate, refetch }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const firstViewEvents = events.slice(-2);

    return (
        <>
            <div className='event' onClick={handleClick}>
                <div className='eventDay'>{day.dayNumber}</div>
                <div className='eventList'>
                    {firstViewEvents.map((event, i) => {
                        return (
                            <>
                                <div key={i} className='visibleEvent'>
                                    {event.title}
                                </div>
                            </>
                        )
                    })}
                    {events?.length > 2 ? <MoreHoriz /> : ""}
                </div>
            </div>
            <EventsPopover
                events={events}
                anchorEl={anchorEl}
                handleClosePopover={handleClose}
                handleCreate={handleCreate}
                day={day}
                refetch={refetch} />
        </>
    )
}
export default Day;