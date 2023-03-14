import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import TableFooter from '@mui/material/TableFooter';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PreviewIcon from '@mui/icons-material/Preview';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {getAllUsers,deleteUser} from '../../actions/users';
// import styles from "./index.css";
const Home = () => {
  //const [users, setUser] = useState([]);
  const [page, setPage] = React.useState(0);
  const [open,setOpen] = useState(false);
  const [id,setId] = useState(0);
  const users = useSelector(state => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const removeUser = (id)=>{
    setOpen(true)
    setId(id);
  }
  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };
  const agreeDelete =()=>{
    dispatch(deleteUser(id));
    setOpen(false)
  }
  useEffect(() => {
    if(!users || users?.length === 0){
      dispatch(getAllUsers());
    }
  }, []);

  // const deleteUser = async (id) => {
  //   await axios.delete(
  //     `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`
  //   );
  //   loadUsers();
  // };

  // const loadUsers = async () => {
  //   const result = await axios.get(
  //     `https://60decafeabbdd9001722d05c.mockapi.io/users`
  //   );
  //   setUser(result.data);
  // };

  return (
    <div>
      <AppBar
        position="absolute"
        color="primary"
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
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.length !== 0 ? (users?.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
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
                          onClick={() => removeUser(row.id)}
                        >
                          <DeleteIcon/>
                        </IconButton>
                      </>
                    </TableCell>
                  </TableRow>
                ))) : <div style={{textAlign: 'center', marginTop: '18px'}} ><p>No Data Available</p></div>}
              </TableBody>
              <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={10}
              count={users?.length || 0}
              rowsPerPage={10}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
            </Table>
          </TableContainer>
        </div>
      </Box>
      <Dialog
        open={open}
        onClose={()=>{setOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setOpen(false)}}>Disagree</Button>
          <Button onClick={agreeDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;