import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
// import CloseIcon from '@material-ui/icons/CloseIcon';
import { Close } from '@material-ui/icons';
import Controls from "../controls/Controls";




const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(1),
   
        position: 'absolute',
        top: theme.spacing(1)
    },
    dialogTitle: {
        paddingRight: '5px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="lg" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="secondary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <Close />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers style={{width:"900px" }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}