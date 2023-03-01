import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { createUser, getUser, updateUser } from '../../actions/users'
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  InputLabel,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  Box, MenuItem
} from "@mui/material";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const AddUser = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [value, setValue] = React.useState(0);
  let [educationList] = useState([
    { id: "none", name: "Select Education Type" },
    { id: 1, name: "Under Graduate" },
    { id: 2, name: "Post Graduate" },
    { id: 3, name: "Others" },
  ]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  let yupSelectNoneValidation = (msg) => Yup.string().test('SelectNoneValidation', msg, function (val) {
    return val !== "none";
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      type: "",
      institute: "",
      passingYear: "",
      employeeCode: "",
      companyName: "",
      designation: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(4, "Must be 4 charecters or more")
        .max(20, "Must be 20 characters or less")
        .required("First Name is  Required"),
      lastName: Yup.string()
        .min(4, "Must be 4 charecters or more")
        .max(20, "Must be 20 characters or less")
        .required("Last Name is Required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is Required")
      // type: yupSelectNoneValidation('Education is Required'),
      // institute: Yup.string()
      //   .min(4, "Must be 4 charecters or more")
      //   .max(20, "Must be 20 characters or less")
      //   .required("School/College/University is Required"),
      // passingYear: Yup.string()
      //   .min(4, "Must be 4 charecters or more")
      //   .max(20, "Must be 20 characters or less")
      //   .required("Passing Year is Required"),
      // employeeCode: Yup.string()
      //   .min(4, "Must be 4 charecters or more")
      //   .max(20, "Must be 20 characters or less")
      //   .required("Employee Code is Required"),
      // companyName: Yup.string()
      //   .min(4, "Must be 4 charecters or more")
      //   .max(20, "Must be 20 characters or less")
      //   .required("Company Name is Required"),
      // designation: Yup.string()
      //   .min(4, "Must be 4 charecters or more")
      //   .max(20, "Must be 20 characters or less")
      //   .required("Designation is Required"),

    }),
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
      let payload = {
        basicInfo: {
          firstName: values.firstName ? values.firstName : null,
          lastName: values.lastName ? values.lastName : null,
          email: values.email ? values.email : null,
        },
        academicInfo: [
          {
            type: values.type ? values.type : values.type,
            institute: values.institute ? values.institute : null,
            passingYear: values.passingYear ? values.passingYear : null,
          },
        ],
        employementInfo: [
          {
            employeeCode: values.employeeCode ? values.employeeCode : null,
            companyName: values.companyName ? values.companyName : null,
            designation: values.designation ? values.designation : null,
          },
        ],
      };
      console.log(payload)
      id ? submitUpdateData(payload) : submitAddData(payload);
      // submitData(values);
      formik.resetForm();
    },
  });
  const submitAddData = async (e) => {
    dispatch(createUser(e));
    //await axios.post("https://60decafeabbdd9001722d05c.mockapi.io/users", e);
    navigate("/");
  };
  const submitUpdateData = async (e) => {
    dispatch(updateUser(id, e));

    // await axios.put(
    //   `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`,
    //   e
    // );
    navigate("/");
  };
  // const loadUser = async () => {
  //   const result = await axios.get(
  //     `http://localhost:3000/api/user/${id}`
  //   );
  //   formik.setFieldValue("firstName", result.data.firstName);
  //   formik.setFieldValue("lastName", result.data.lastName);
  //   formik.setFieldValue("email", result.data.email);
  //   formik.setFieldValue("type", result.data.type);
  //   formik.setFieldValue("institute", result.data.institute);
  //   formik.setFieldValue("passingYear", result.data.passingYear);
  //   formik.setFieldValue("employeeCode", result.data.employeeCode);
  //   formik.setFieldValue("companyName", result.data.companyName);
  //   formik.setFieldValue("designation", result.data.designation);
  // };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    if (id) {
      const user = users.find(_u => _u.id == id);
      console.log('user', user)
      formik.setFieldValue("firstName", user?.basicInfo?.firstName);
      formik.setFieldValue("lastName", user?.basicInfo?.lastName);
      formik.setFieldValue("email", user?.basicInfo?.email);
      formik.setFieldValue("type", user?.academicInfo?.[0].type);
      formik.setFieldValue("institute", user?.academicInfo?.[0].institute);
      formik.setFieldValue("passingYear", user?.academicInfo?.[0].passingYear);
      formik.setFieldValue("employeeCode", user?.employementInfo?.[0].employeeCode);
      formik.setFieldValue("companyName", user?.employementInfo?.[0].companyName);
      formik.setFieldValue("designation", user?.employementInfo?.[0].designation);
    }
  }, [users]);
  useEffect(() => {
    if (id) {
      dispatch(getUser(id));
    }
  }, []);
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
        <Toolbar style={{ width: "100%", justifyContent: 'center' }} align="center">
          <Typography style={{ width: "100%" }} align="center" variant="h6" color="inherit" noWrap>
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
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Basic Information" {...a11yProps(0)} />
            <Tab label="Academic Information" {...a11yProps(1)} />
            <Tab label="Employment Information" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h2>
                  <span>Basic Information</span>
                </h2>
              </Typography>
              <FormikProvider value={formik}>
                <Grid container>
                  <Grid item xs={3}>
                    <Field name="firstName">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>First Name</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter First Name"
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="lastName">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Last Name</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Last Name"
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <br />
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="email">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Email</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Email"
                            required
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <br />

                  <br />
                  <Grid item xs={9}></Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={3}>
                    <div className={`col-2`}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          formik.setTouched({
                            firstName: true,
                            lastName: true,
                            email: true,
                          })
                          formik.validateForm().then((err) => {
                            if (err.firstName || err.lastName || err.email) {
                              return
                            } else {
                              setValue(1);
                            }
                          })

                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </FormikProvider>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h2>
                  <span>Academic Information</span>
                </h2>
              </Typography>
              <FormikProvider value={formik}>
                <Grid container>
                  <Grid item xs={3}>
                    <Field name="type">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Education Type</InputLabel>
                          <TextField
                            {...field}
                            select
                            size="small"
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          >
                            {educationList.map((e) => (
                              <MenuItem key={e.id} value={e.name}>
                                {e.name}
                              </MenuItem>
                            ))}
                          </TextField>
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="institute">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel >
                            School/College/University{" "}
                          </InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter School/College/University"
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <br />
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="passingYear">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel>Passing year</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Passing year"
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="number"
                            inputProps={{ maxLength: 4, }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <br />

                  <br />
                  <Grid item xs={9}></Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={3}>
                    <div className={`col-2`}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          setValue(2);
                        }}
                      >
                        Next
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </FormikProvider>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                <h2>
                  <span>Employment Information </span>
                </h2>
              </Typography>
              <FormikProvider value={formik}>
                <Grid container>
                  <Grid item xs={3}>
                    <Field name="employeeCode">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel>Employee Code</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Employee Cpde"
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="companyName">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel>Company Name</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Company Name"
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                    <br />
                  </Grid>
                  <br />
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Field name="designation">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel>Designation</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Designation"
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={{ maxLength: 50 }}
                            {...{ error: meta.touched && meta.error }}
                            helperText={
                              meta.touched && meta.error && meta.error
                            }
                          />
                        </div>
                      )}
                    </Field>
                  </Grid>
                  <br />

                  <br />
                  <Grid item xs={9}></Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={3}>
                    <div className={`col-2`}>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          formik.handleSubmit();
                        }}
                      >
                        {id ? "Update" : "Save"}
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </FormikProvider>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </div>
  );
};

export default AddUser;
