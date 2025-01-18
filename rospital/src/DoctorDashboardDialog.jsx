import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function DateDialog({ open, selectedDate, handleClose }) {
  return (
    <Dialog
      open={open} // Deschide dialogul dacă este true
      onClose={handleClose} // Închide dialogul când se apasă afară sau pe butonul de închidere
      maxWidth="md" // Setăm lățimea maximă a dialogului
      fullWidth // Setăm dialogul pe întreaga lățime disponibilă
      sx={{
        "& .MuiDialog-paper": {
          padding: "20px", // Padding pentru interiorul dialogului
          borderRadius: "10px", // Colțuri rotunjite
        },
      }}
    >
      {/* Titlul dialogului */}
      <DialogTitle>
        Appointments for{" "}
        {selectedDate.length > 0 ? selectedDate[0].date : "Selected Date"}
      </DialogTitle>

      {/* Conținutul dialogului */}
      <DialogContent>
        {selectedDate.length > 0 ? (
          <List>
            {/* Listă pentru a afișa programările */}
            {selectedDate.map((appointment, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Time: ${appointment.begin} - ${appointment.end}`} // Display start and end time
                  secondary={`Pacient: ${appointment.pacientUsername}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No appointments for this date.</Typography>
        )}
      </DialogContent>

      {/* Acțiuni ale dialogului (butonul de închidere) */}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DateDialog;
