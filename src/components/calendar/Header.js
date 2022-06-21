import React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { months } from '../../utils/date';

const Header = ({ month, year, setMonth, monthHandler }) => {
    const decreaseMonth = () => {
        setMonth(Math.abs((month + 12 - 1) % 12));
    };

    const increaseMonth = () => {
        setMonth(Math.abs((month + 1) % 12));
    };

    return (
        <div className="header">
            <div className="header--info">
                <span className="header-icons"> 
                    <span onClick={decreaseMonth}>
                        <ArrowBackIosIcon />
                    </span>
                </span>
                <span className="header--month" onClick={monthHandler}>
                    {months[month]} {year}
                </span>
                <span className="header-icons">
                    <span onClick={increaseMonth}>
                        <ArrowForwardIosIcon />
                    </span>
                </span>
            </div>
        </div>
    )
}

export default Header;