import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider"
import { getUser } from "../../actions/users";
const User = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const user = users.find((_u) => _u.id == id);
      console.log("user", user);
      setUser(user);
    }
  }, [users]);
  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, []);
  return (
    <div className="container py-4">
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar
          style={{ width: "100%", justifyContent: "center" }}
          align="center"
        >
          <Typography
            style={{ width: "100%" }}
            align="center"
            variant="h6"
            color="inherit"
            noWrap
          >
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
        <hr />
        <Box>
          <Card
            variant="outlined"
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Basic Information
            </Typography>
            <Typography><b>First Name: </b> {user?.basicInfo?.firstName}</Typography>
            <Typography><b>Last Name: </b> {user?.basicInfo?.lastName}</Typography>
            <Typography><b>Email: </b> {user?.basicInfo?.email}</Typography>
          </Card>
          <Card
            variant="outlined"
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Academic Information
            </Typography>
            {user?.academicInfo?.map((element) => (
              <div>
                <br />
                <Typography><b>Type: </b>{element?.type}</Typography>
              <Typography><b>Institute:</b> {element?.institute}</Typography>
              <Typography><b>PassingYear:</b> {element?.passingYear}</Typography>
              <br />
              <Divider />
              </div>
            ))}
          </Card>
          <Card
            variant="outlined"
            sx={{
              paddingTop: "10px",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Employment Information
            </Typography>
            {user?.employementInfo?.map((element) => (
              <div>
                <br />
                <Typography><b>EmployeeCode: </b>{element?.employeeCode}</Typography>
              <Typography><b>CompanyNam:</b> {element?.companyName}</Typography>
              <Typography><b>Designation:</b> {element?.designation}</Typography>
              <br />
              <Divider />
              </div>
            ))}
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default User;
