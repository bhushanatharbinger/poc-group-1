import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
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
      
        <hr />
        
        <div style={{ width: "100%", paddingTop: "30px",}} >
          <Box>
            <div style={{ float: "left", width: "auto", marginLeft: "371px",  textAlign: "left",  }}>
              <Card
                variant="outlined"
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  width: "230px",
                  paddingLeft: "8px",
                  borderRadius: "10px"  
                  
                }}
              >
                <Typography variant="h5" gutterBottom sx={{textDecoration: "underline"}}>
                  Basic Information
                </Typography>
                <Typography>
                  <b>First Name: </b> {user?.basicInfo?.firstName}
                </Typography>
                <Typography>
                  <b>Last Name: </b> {user?.basicInfo?.lastName}
                </Typography>
                <Typography>
                  <b>Email: </b> {user?.basicInfo?.email}
                </Typography>
              </Card>
            </div>
          </Box>
          <Box>
            <div style={{ float: "right", width: "300px", marginRight: "300px",  textAlign: "left"  }}>
              <Card
                variant="outlined"
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px"  
                }}
              >
                <Typography variant="h5" gutterBottom sx={{textDecoration: "underline"}}>
                  Employment Information
                </Typography>
                {user?.employementInfo?.map((element) => (
                  <div>
                    <br />
                    <Typography>
                      <b>EmployeeCode: </b>
                      {element?.employeeCode}
                    </Typography>
                    <Typography>
                      <b>CompanyNam:</b> {element?.companyName}
                    </Typography>
                    <Typography>
                      <b>Designation:</b> {element?.designation}
                    </Typography>
                    <br />
                    <Divider />
                  </div>
                ))}
              </Card>
            </div>
          </Box>
          <Box>
            <div style={{ margin: "0 auto", width: "300px",  textAlign: "left"  }}>
              <Card
                variant="outlined"
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  paddingLeft: "10px",
                  borderRadius: "10px"  
                }}
              >
                <Typography variant="h5" gutterBottom sx={{textDecoration: "underline"}}>
                  Academic Information
                </Typography>
                {user?.academicInfo?.map((element) => (
                  <div>
                    <br />
                    <Typography>
                      <b>Type: </b>
                      {element?.type}
                    </Typography>
                    <Typography>
                      <b>Institute:</b> {element?.institute}
                    </Typography>
                    <Typography>
                      <b>PassingYear:</b> {element?.passingYear}
                    </Typography>
                    <br />
                    <Divider />
                  </div>
                ))}
              </Card>
            </div>
          </Box>
          
        </div>
      
    </div>
  );
};

export default User;
