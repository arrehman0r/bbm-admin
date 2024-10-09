import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { styled } from '@mui/joy/styles';

// Styled components (unchanged)
const TimeSlotTypography = styled(Typography)({
  padding: '8px',
  color: 'var(--joy-palette-text-tertiary)',
  fontSize: '0.875rem',
});

const StaffHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px',
  borderBottom: '1px solid var(--joy-palette-divider)',
  height: '64px',
});

const GridCell = styled(Box)({
  height: '64px',
  borderBottom: '1px solid var(--joy-palette-divider)',
  padding: '4px',
});

const AppointmentCard = styled(Card)({
  backgroundColor: 'var(--joy-palette-primary-softBg)',
  height: '100%',
  padding: '4px',
  fontSize: '0.75rem',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
});

const ScrollableBox = styled(Box)({
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: 'var(--joy-palette-background-level1)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--joy-palette-neutral-outlinedBorder)',
    borderRadius: '4px',
  },
});

// Sub-components (unchanged)
const TimeSlot = ({ time }) => (
  <TimeSlotTypography>{time}</TimeSlotTypography>
);

const StaffHeaderComponent = ({ staff }) => (
  <StaffHeader>
    <Avatar
      src={staff.profileImg}
      alt={staff.firstName}
      size="sm"
    >
      {staff.firstName[0]}{staff.lastName ? staff.lastName[0] : ''}
    </Avatar>
    <Typography level="body-sm" fontWeight="md" >
      {staff.firstName}
    </Typography>
  </StaffHeader>
);

const AppointmentBlock = ({ appointment }) => (
  <AppointmentCard variant="soft">
    <Typography level="body-sm" fontWeight="md">
      {appointment.customer.firstName}
    </Typography>
    <Typography level="body-xs">
      {appointment.serviceName}
    </Typography>
    <Typography level="body-xs">
      ${appointment.price}
    </Typography>
  </AppointmentCard>
);

// Hardcoded data
const hardcodedStaff = [
  { id: 1, firstName: 'Mary', lastName: 'Thomas', email: 'mary.thomas@example.com', profileImg: '' },
  { id: 2, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', profileImg: '' },
  { id: 3, firstName: 'Sarah', lastName: 'Smith', email: 'sarah.smith@example.com', profileImg: '' },
  { id: 4, firstName: 'Michael', lastName: 'Johnson', email: 'michael.johnson@example.com', profileImg: '' },
  { id: 5, firstName: 'Emily', lastName: 'Brown', email: 'emily.brown@example.com', profileImg: '' },
  { id: 6, firstName: 'David', lastName: 'Wilson', email: 'david.wilson@example.com', profileImg: '' },
  { id: 7, firstName: 'Jessica', lastName: 'Taylor', email: 'jessica.taylor@example.com', profileImg: '' },
];

// ... rest of the code remains the same
const hardcodedAppointments = [
  {
    bookingId: '1',
    serviceName: 'Haircut',
    slots: [{ startTime: '10:00' }],
    status: 'BOOKED',
    customer: { firstName: 'Alice', lastName: 'Johnson' },
    price: 50,
    staff: { email: 'mary.thomas@example.com' }
  },
  {
    bookingId: '2',
    serviceName: 'Manicure',
    slots: [{ startTime: '11:00' }],
    status: 'BOOKED',
    customer: { firstName: 'Bob', lastName: 'Smith' },
    price: 30,
    staff: { email: 'john.doe@example.com' }
  },
  {
    bookingId: '3',
    serviceName: 'Massage',
    slots: [{ startTime: '14:00' }],
    status: 'BOOKED',
    customer: { firstName: 'Carol', lastName: 'Davis' },
    price: 80,
    staff: { email: 'sarah.smith@example.com' }
  },
];

const TodaysAppointments = () => {
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

  const getAppointmentForStaffAndTime = (staffEmail, time) => {
    return hardcodedAppointments.find(booking =>
      booking.staff.email === staffEmail &&
      booking.slots[0]?.startTime === time
    );
  };

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: 'sm',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        {/* Time column */}
        <Box sx={{
          width: '80px',
          borderRight: '1px solid',
          borderColor: 'divider',
          flexShrink: 0,
          bgcolor: 'background.level1'
        }}>
          <Box sx={{ height: 64 }} /> {/* Empty top-left cell */}
          {timeSlots.map(time => (
            <GridCell key={time}>
              <TimeSlot time={time} />
            </GridCell>
          ))}
        </Box>

        {/* Staff columns */}
        <ScrollableBox>
          <Box sx={{ display: 'flex', minWidth: 'max-content' }}>
            {hardcodedStaff.map(staff => (
              <Box
                key={staff.id}
                sx={{
                  width: 200,
                  borderRight: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderRight: 'none',
                  },
                }}
              >
                <StaffHeaderComponent staff={staff} />
                {timeSlots.map(time => {
                  const appointment = getAppointmentForStaffAndTime(staff.email, time);
                  return (
                    <GridCell key={`${staff.email}-${time}`}>
                      {appointment && (
                        <AppointmentBlock
                          appointment={appointment}
                        />
                      )}
                    </GridCell>
                  );
                })}
              </Box>
            ))}
          </Box>
        </ScrollableBox>
      </Box>
    </Sheet>
  );
};

export default TodaysAppointments;