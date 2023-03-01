import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import {  getUser } from '../../actions/users'
const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [user,setUser] = useState({})
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const user = users.find(_u => _u.id == id);
      console.log('user', user)
      setUser(user)
      // formik.setFieldValue("firstName", user?.basicInfo?.firstName);
      // formik.setFieldValue("lastName", user?.basicInfo?.lastName);
      // formik.setFieldValue("email", user?.basicInfo?.email);
      // formik.setFieldValue("type", user?.academicInfo?.[0].type);
      // formik.setFieldValue("institute", user?.academicInfo?.[0].institute);
      // formik.setFieldValue("passingYear", user?.academicInfo?.[0].passingYear);
      // formik.setFieldValue("employeeCode", user?.employementInfo?.[0].employeeCode);
      // formik.setFieldValue("companyName", user?.employementInfo?.[0].companyName);
      // formik.setFieldValue("designation", user?.employementInfo?.[0].designation);
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
      {/* <Link className="btn btn-primary" to="/">
        back to Home
      </Link> */}
      <hr />
      <Box>
      <Card variant="outlined" sx={{paddingTop:"10px",paddingBottom:"10px",marginBottom:"10px"}}>
        <Typography variant="h5" gutterBottom>Basic Information</Typography>
        <Typography >first Name: { user?.basicInfo?.firstName}</Typography>
        <Typography >last name: { user?.basicInfo?.lastName}</Typography>
        <Typography >email: { user?.basicInfo?.email}</Typography>
      </Card>
      <Card variant="outlined" sx={{paddingTop:"10px",paddingBottom:"10px",marginBottom:"10px"}}>
        <Typography variant="h5" gutterBottom>Academic Information</Typography>
        <Typography >type: {user?.academicInfo?.[0].type}</Typography>
        <Typography >institute: {user?.academicInfo?.[0].institute}</Typography>
        <Typography >passingYear: {user?.academicInfo?.[0].passingYear}</Typography>
        </Card>
        <Card variant="outlined" sx={{paddingTop:"10px",paddingBottom:"10px",marginBottom:"10px"}}>
        <Typography variant="h5" gutterBottom>Employment Information</Typography>
        <Typography >employeeCode: {user?.employementInfo?.[0].employeeCode}</Typography>
        <Typography >companyName: {user?.employementInfo?.[0].companyName}</Typography>
        <Typography >designation: {user?.employementInfo?.[0].designation}</Typography>
        </Card>
      </Box>
      </Box>
    </div>
  );
};

export default User;
