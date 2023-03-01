import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, MenuItem } from "@mui/material";

import {
  Card,
  CardContent,
  Grid,
  Input,
  InputLabel,
  Paper,
  TextField,
  Typography,
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
        .required("Email is Required"),
      type: yupSelectNoneValidation('Education is Required'),
      institute: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("School/College/University is Required"),
      passingYear: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Passing Year is Required"),
      employeeCode: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Employee Code is Required"),
      companyName: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Company Name is Required"),
      designation: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Designation is Required"),

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
            institute: values.institute? values.institute : null,
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
    // e.preventDefault();
    await axios.post("https://60decafeabbdd9001722d05c.mockapi.io/users", e);
    navigate("/landing-page");
  };
  const submitUpdateData = async (e) => {
    await axios.put(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`,
      e
    );
    navigate("/landing-page");
  };
  const loadUser = async () => {
    const result = await axios.get(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`
    );
    formik.setFieldValue("firstName", result.data.firstName);
    formik.setFieldValue("lastName", result.data.lastName);
    formik.setFieldValue("email", result.data.email);
    formik.setFieldValue("type", result.data.type);
    formik.setFieldValue("institute", result.data.institute);
    formik.setFieldValue("passingYear", result.data.passingYear);
    formik.setFieldValue("employeeCode", result.data.employeeCode);
    formik.setFieldValue("companyName", result.data.companyName);
    formik.setFieldValue("designation", result.data.designation);
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <>
      <Box sx={{ width: "100%" }}>
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
                        variant="outlined"
                        sx={{ color: "blue" }}
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
                            value={field.name ? field.name : "none"}
                            select
                            size="small"
                            required
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
                          <InputLabel required>
                            School/College/University{" "}
                          </InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter School/College/University"
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
                    <Field name="passingYear">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Passing year</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Passing year"
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            inputProps={{ maxLength: 4 }}
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
                        variant="outlined"
                        sx={{ color: "blue" }}
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
                          <InputLabel required>Employee Code</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Employee Cpde"
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
                    <Field name="companyName">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Company Name</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Company Name"
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
                    <Field name="designation">
                      {({ field, meta }) => (
                        <div>
                          <InputLabel required>Designation</InputLabel>
                          <TextField
                            {...field}
                            // disabled={formik.values.view ? true : false}
                            placeholder="Enter Designation"
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
                        variant="outlined"
                        sx={{ color: "blue" }}
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
    </>
  );
};

export default AddUser;
