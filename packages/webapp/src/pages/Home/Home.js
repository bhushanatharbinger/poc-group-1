import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PreviewIcon from '@mui/icons-material/Preview';

// const columns = [
//   { field: 'city' },
//   { field: 'oct', type: 'number', valueFormatter: ({ value }) => `${value} °C` },
//   { field: 'nov', type: 'number', valueFormatter: ({ value }) => `${value} °C` },
//   { field: 'dec', type: 'number', valueFormatter: ({ value }) => `${value} °C` },
// ];

// const rows = [
//   { id: 1, city: 'Amsterdam', oct: 7.1, nov: 4, dec: 10.2 },
//   { id: 2, city: 'Barcelona', oct: 14.9, nov: 12.3, dec: 18.2 },
//   { id: 3, city: 'Paris', oct: 8.1, nov: 5.4, dec: 12.3 },
//   { id: 4, city: 'São Paulo', oct: 20.2, nov: 21.1, dec: 19.2 },
// ];
const Home = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`
    );
    loadUsers();
  };

  const loadUsers = async () => {
    const result = await axios.get(
      `https://60decafeabbdd9001722d05c.mockapi.io/users`
    );
    setUser(result.data);
  };

  return (
    <div>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar style={{width: "100%",justifyContent: 'center'}} align="center">
          <Typography style={{width:"100%"}} align="center"  variant="h6" color="inherit" noWrap>
            POC-GROUP-1
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          mx: "auto",
          width: 1000,
          p: 1,
          // m: 1,
          mt: 5,
          ml: 17,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.50",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          textAlign: "center",
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      >
        <div className="home-page">
        <Box sx={{ display: 'flex', justifyContent: 'flex-end',marginBottom:'10px' }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/adduser")}
          >Add
          </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">User Name</TableCell>
                  <TableCell align="center">Email Id</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.username}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      <>
                        <IconButton
                          aria-label="view"
                          onClick={() => navigate(`/user/${row.id}`)}
                        >
                          <PreviewIcon></PreviewIcon>
                        </IconButton>
                        &nbsp;&nbsp;
                        <IconButton
                          aria-label="edit"
                          onClick={() => navigate(`/edituser/${row.id}`)}
                        >
                          <AppRegistrationIcon/>
                        </IconButton>
                        &nbsp;&nbsp;
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => deleteUser(row.id)}
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>
    </div>
  );
};

export default Home;
