import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
      <h2>Landing Page</h2>
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
        {/* <div className="main" style={{ height: 400, width: "100%" }}>
          {rows.length !== 0 && <DataGrid
            rows={rows}
            columns={columns}
            getCellClassName={(params) => {
              if (params.field === "city" || params.value == null) {
                return "";
              }
              return params.value >= 15 ? "hot" : "cold";
            }}
          />}
        </div> */}
        <div className="home-page">
          {/* <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Email Id</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <Button
                    variant="contained"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edituser/${user.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </tr>
              ))}
            </tbody>
          </table> */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/adduser")}
          >
            Add
          </Button>
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
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => navigate(`/user/${row.id}`)}
                        >
                          View
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => navigate(`/edituser/${row.id}`)}
                        >
                          Edit
                        </Button>
                        &nbsp;&nbsp;
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteUser(row.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
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
