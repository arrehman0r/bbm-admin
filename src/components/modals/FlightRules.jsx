import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';

export default function FlightRulesModal({openFlightRule, setOpenFlightRule, selectedFlightRules }) {
 
  return (
    <React.Fragment>
      
      <Modal open={openFlightRule} onClose={() => setOpenFlightRule(false)}>
        <ModalDialog layout="fullscreen">
          <ModalClose />
          <DialogTitle>Modal Dialog</DialogTitle>
          <DialogContent>
            <div>
              This is a <code></code> modal dialog. Press <code>esc</code> to
              close it.
            </div>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
