import * as React from 'react';
import Popover from '@mui/material/Popover';
import AppButton from './common/AppButton';


export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <AppButton aria-describedby={id} variant="contained" onClick={handleClick} text="Open Popover"/>
     
     
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <h1 >The content of the Popover.</h1>
      </Popover>
    </div>
  );
}
