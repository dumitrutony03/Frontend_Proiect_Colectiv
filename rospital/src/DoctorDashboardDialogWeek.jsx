import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
const doctorUsername = localStorage.getItem("doctorUsername"); // Retrieve the username

function WeekDialog({ open, handleClose, selectedDate, rawDate }) {
  const [weeklyAppointments, setWeeklyAppointments] = useState([]);

  // Helper function to calculate the beginning (Monday) and the end (Sunday) of the week
  const calculateWeekStartEnd = (rawDate) => {
    const date = new Date(rawDate); // Use the rawDate provided (string format)
    const day = date.getDay(); // Get the day of the week (0=Sunday, 1=Monday, etc.)

    // Calculate the difference to get to Monday (subtract days to go back to Monday)
    const diffToMonday = day === 0 ? -6 : 1 - day; // If Sunday, go back 6 days, otherwise go to Monday
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() + diffToMonday); // Set the date to Monday

    // Calculate Sunday by adding 6 days to the Monday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to Monday to get Sunday

    // Format dates as 'YYYY-MM-DD'
    const formattedStartDate = `${startOfWeek.getFullYear()}-${String(
      startOfWeek.getMonth() + 1
    ).padStart(2, "0")}-${String(startOfWeek.getDate()).padStart(2, "0")}`;
    const formattedEndDate = `${endOfWeek.getFullYear()}-${String(
      endOfWeek.getMonth() + 1
    ).padStart(2, "0")}-${String(endOfWeek.getDate()).padStart(2, "0")}`;
    return { formattedStartDate, formattedEndDate, startOfWeek, endOfWeek };
  };

  useEffect(() => {
    if (open && rawDate) {
      const { formattedStartDate, formattedEndDate } =
        calculateWeekStartEnd(rawDate);

      axios
        .get(
          `http://localhost:8080/appointment/filter?doctor=${doctorUsername}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
        )
        .then((response) => {
          setWeeklyAppointments(response.data); // Store weekly appointments
        })
        .catch((error) => {
          console.error("Error fetching weekly appointments", error);
        });
    }
  }, [open, rawDate]);

  // Get the day names for the week (Monday to Sunday)
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Organize appointments by day of the week
  const getAppointmentsByDay = (appointments) => {
    const daysAppointments = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);
      // Adjust for the day shift in the week, where Sunday is index 0 in getDay(),
      // and your week starts on Monday (index 0 for Monday)
      const adjustedDayOfWeek = (appointmentDate.getDay() + 6) % 7; // Shift Sunday from 0 to 6
      const dayOfWeek = weekDays[adjustedDayOfWeek]; // Get the name of the day
      daysAppointments[dayOfWeek].push(appointment);
    });

    return daysAppointments;
  };

  const appointmentsByDay = getAppointmentsByDay(weeklyAppointments);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      {/* Title */}
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          textAlign: "center",
          padding: "16px 0",
          fontSize: "1.5rem",
        }}
      >
        Weekly Appointments
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent sx={{ backgroundColor: "#f0f4f8", padding: "20px" }}>
        {/* Flexbox container for the days */}
        <Grid container spacing={2} sx={{ justifyContent: "center" }}>
          {weekDays.map((day, index) => {
            const dayAppointments = appointmentsByDay[day];
            return (
              <Grid
                item
                key={index}
                xs={12} // On smaller screens, use full width
                sm={3} // On medium and larger screens, use a 3-column layout
              >
                <Box
                  sx={{
                    padding: "16px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "8px",
                    textAlign: "center",
                    minHeight: "160px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#1976d2",
                      marginBottom: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {day}
                  </Typography>
                  <Divider sx={{ marginBottom: "10px" }} />
                  {dayAppointments.length > 0 ? (
                    <Box>
                      {dayAppointments.map((appointment, idx) => (
                        <Box key={idx} sx={{ marginBottom: "10px" }}>
                          <Typography variant="body2">
                            <strong>{`${appointment.begin} - ${appointment.end}`}</strong>
                          </Typography>
                          <Typography variant="body2">
                            Pacient: {appointment.pacientUsername}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" sx={{ color: "#999" }}>
                      No appointments
                    </Typography>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>

      {/* Dialog Actions */}
      <DialogActions sx={{ backgroundColor: "#f0f4f8" }}>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default WeekDialog;
