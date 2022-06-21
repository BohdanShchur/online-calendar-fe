import React from 'react';
import { Button, Card, CardContent, Menu, MenuItem, Paper } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDeleteEvent } from './hooks/useMutationsEvent';
import { CustomPopover } from '../popover/customPopover';


export const EventsPopover = ({ events, anchorEl, handleClosePopover, handleCreate, day }) => {
    const [anchorElMenu, setAnchorElMenu] = React.useState(null);
    const openMenu = Boolean(anchorElMenu);
    const handleClick = (event) => {
        setAnchorElMenu(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElMenu(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [deleteEvent] = useDeleteEvent();
    const handleDelete = (id) => {
        deleteEvent({
            variables: {
                eventId: id
            }
        })
    }

    return (
        <CustomPopover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
        >
            <Paper className="popover_paper">
                {events.map((event, i) => {
                    return (
                        <Card key={i} sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                        }
                        }>
                            <CardContent sx={{
                                display: "flex",
                                width: 300,
                                justifyContent: "space-between",
                            }}>
                                <div className='event_card_time'>
                                    <div>
                                        {new Date(event.eventTimeRange.start).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div>
                                        {new Date(event.eventTimeRange.start).toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                                <div className='event_card_content'>
                                    {event.title}
                                </div>
                            </CardContent>
                            <div className='card_option_btn'>
                                <Button
                                    id={"basic-button" + i}
                                    aria-controls={openMenu ? 'basic-menu' + i : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openMenu ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </Button>
                                <Menu
                                    id={'basic-menu' + i}
                                    anchorEl={anchorElMenu}
                                    open={openMenu}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': `basic-button${i}`,
                                    }} >
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            handleClosePopover();
                                            handleCreate(event, true);
                                        }}
                                    >
                                        Edit
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => handleDelete(event._id)}
                                    >Delete</MenuItem>
                                </Menu>
                            </div>
                        </Card>
                    )
                })}
            </Paper>
            <div>
                <Button onClick={() => {
                    handleCreate(day, false)
                    handleClosePopover()
                }}>
                    Create
                </Button>
            </div>
        </CustomPopover>
    )
}