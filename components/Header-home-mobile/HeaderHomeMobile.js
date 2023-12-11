import React from 'react';
import { Paper } from '@mui/material';
import {
    ArrowLeft
} from 'react-feather'

const HeaderHomeMobile = ({
    title, onBack
}) => {

    return (
        <Paper
            elevation={8}
            style={{minHeight: 50, placeItems: 'center', display: 'flex',}}
        >
            <div className="px-2 d-flex" style={{gap: 30}}>
                <ArrowLeft onClick={onBack} />
                <h4 style={{paddingTop: 2}}>{title}</h4>
            </div>
        </Paper>
    )
};

export default HeaderHomeMobile;