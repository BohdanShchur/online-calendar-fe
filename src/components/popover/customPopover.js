import React from 'react';
import Popover from '@mui/material/Popover';

export const CustomPopover = ({ children,  id, open, anchorEl, handleClosePopover}) => {
    
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            className="popover"
        >
            {children}
        </Popover>
    )
};