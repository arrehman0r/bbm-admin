import React, { useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from '@mui/joy/Alert';
import { styled } from '@mui/joy/styles';
import { getAllBookings, getAllBusinessStaff } from "../../server/api";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { formatDate, tConvert } from "../../components/utils";

// Styled components
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

// Sub-components
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

const LoadingState = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <CircularProgress />
  </Box>
);

const ErrorState = ({ error }) => (
  <Alert color="danger" sx={{ m: 2 }}>
    {error}
  </Alert>
);

const EmptyState = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
    <Typography level="body-lg" color="neutral">
      No appointments scheduled for today
    </Typography>
  </Box>
);

const TodaysAppointments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todaysBooking, setTodaysBooking] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  
  const userData = useSelector((state) => state.user.loginUser);
  const { enqueueSnackbar } = useSnackbar();
  
  const timeSlots = Array.from({ length: 10 }, (_, i) => `${i + 9}:00`);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [bookingsResponse, staffResponse] = await Promise.all([
        getAllBookings(),
        getAllBusinessStaff(userData?.businessId)
      ]);
      console.log("bookingsResponse", bookingsResponse,staffResponse )
      setTodaysBooking(bookingsResponse.result || []);
      setAllStaff(staffResponse.body || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load appointments data");
      enqueueSnackbar("Error loading appointments", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userData?.businessId]);

  const getAppointmentForStaffAndTime = (staffEmail, time) => {
    return todaysBooking.find(booking => 
      booking.staff.email === staffEmail && 
      booking.slots[0]?.startTime === time
    );
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!allStaff.length || !todaysBooking.length) return <EmptyState />;

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: 'sm',
        overflow: 'hidden',
      }}
    >
      {/* <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        <Typography level="h2">Today's Schedule</Typography>
        <Typography level="body-sm">
          {formatDate(new Date().toISOString())}
        </Typography>
      </Box> */}
      
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
            {allStaff.map(staff => (
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
                          onClick={() => {
                            enqueueSnackbar(`Appointment: ${appointment.serviceName} with ${appointment.customer.firstName}`, {
                              variant: "info"
                            });
                          }}
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