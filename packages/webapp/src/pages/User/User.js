import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { getUser } from "../../actions/users";
import Button from "@mui/material/Button";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        color="primary"
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
          <Button color="inherit" align="right" onClick={()=>navigate("/")}>Back</Button>
        </Toolbar>
      </AppBar>
      
        <hr />
        
        <div style={{ width: "100%",display:"flex", paddingTop: "30px",}} >
     
            <div style={{ width:"20%",marginLeft:'10%',marginRight:"20px"  }}>
              <Card
                variant="outlined"
                sx={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  marginBottom: "10px",
                  paddingLeft: "8px",
                  borderRadius: "10px"  
                }}
              >
               <AccountCircleIcon style={{fontSize:'100px'}} color="primary"></AccountCircleIcon>
                <Typography variant="h4" color={"black"}>
                   {user?.basicInfo?.firstName} {user?.basicInfo?.lastName}
                </Typography>
                <Typography variant="p">
                 {user?.basicInfo?.email}
                </Typography>
                <br/>
                <br/>
                <Button
                variant="outlined"
                          aria-label="edit"
                          onClick={() => navigate(`/edituser/${user.id}`)}
                        >
                          Edit
                        </Button>
              </Card>
            </div>
         
            <div style={{ flex:1, marginRight:'10%',textAlign: "left"  }}>
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
                <Typography variant="h5" gutterBottom >
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
                <Typography variant="h5" gutterBottom >
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
        </div>
      
    </div>
  );
};

export default User;
