import React, { useMemo, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Slide from '@mui/material/Slide';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { useCreateEvent, useUpdateEvent } from '../calendar/hooks/useMutationsEvent';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EventDialog = ({ open, handleClose, day, event, isEdit, refetch }) => {
    const [values, setValues] = useState({});

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleTimeChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event });
    }

    const dialogTitle = useMemo(() => isEdit ? "Edit" : "Create");
    useEffect(() => {
        if (isEdit) {
            setValues({
                title: event.title,
                description: event.description,
                start: event.eventTimeRange.start,
                end: event.eventTimeRange.end,
                notificationTime: event.notificationTime
            })
        } else {
            setValues({
                title: "",
                description: "",
                start: new Date(day),
                end: new Date(day),
                notificationTime: 5
            })
        }
    }, [isEdit, event, setValues]);

    const [createEvent] = useCreateEvent();
    const [updateEvent] = useUpdateEvent();

    const handleSubmit = async (e) => {
        if (isEdit) {
            updateEvent({
                variables: {
                    event: {
                        title: values.title,
                        description: values.description,
                        eventTimeRange: {
                            start: values.start,
                            end: values.end
                        },
                        notificationTime: values.notificationTime
                    },
                    eventId: event._id
                }
            }).then(() => {
                refetch();
            })
        } else {
            createEvent({
                variables: {
                    event: {
                        title: values.title,
                        description: values.description,
                        eventTimeRange: {
                            start: values.start,
                            end: values.end
                        },
                        notificationTime: values.notificationTime
                    }
                }
            }).then(() => {
                refetch();
            })
        }
        handleClose();
        e.preventDefault();
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{`${dialogTitle} Action   ${new Date(day).toDateString()}`}</DialogTitle>
            <DialogContent>
                <form >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TextField
                            variant="standard"
                            label="title"
                            value={values.title}
                            onChange={handleChange('title')}
                            fullWidth
                        />
                        <TextField
                            variant="standard"
                            label="description"
                            value={values.description}
                            onChange={handleChange('description')}
                            fullWidth
                        />
                        <TimePicker
                            value={values.start}
                            onChange={handleTimeChange('start')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            value={values.end}
                            onChange={handleTimeChange('end')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <InputLabel id="demo-simple-select-label">Notification Time</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={values.notificationTime}
                            label="Age"
                            onChange={handleChange('notificationTime')}
                        >
                            <MenuItem value={5}>5 min</MenuItem>
                            <MenuItem value={10}>10 min</MenuItem>
                            <MenuItem value={15}>15 min</MenuItem>
                            <MenuItem value={30}>30 min</MenuItem>
                        </Select>
                    </LocalizationProvider>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
export default EventDialog;