import {
  AppBar,
  Box,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Paper,
  Toolbar,
  Typography,
  Select,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { Field, FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { createUser, getUser, updateUser } from "../../actions/users";
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
  const users = useSelector((state) => state.users);
  const [formValuesAcademic, setFormValuesAcademic] = useState([
    { type: "", institute: "", passingYear: "" },
  ]);
  const [formValuesEmployement, setFormValuesEmployement] = useState([
    { employeeCode: "", companyName: "", designation: "" },
  ]);
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
  const handleYearChange = (event) => {
    formik.setFieldValue("passingYear", event.target.value);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  let yupSelectNoneValidation = (msg) =>
    Yup.string().test("SelectNoneValidation", msg, function (val) {
      return val !== "none";
    });
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const steps = [
    {
      label: "Basic Information",
    },
    {
      label: "Academic Information",
    },
    {
      label: "Employeement Information",
    },
  ];
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      type: "",
      institute: "",
      passingYear: new Date().getFullYear(),
      employeeCode: "",
      companyName: "",
      designation: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .trim()
        .required("First Name is  Required")
        .matches(/^[aA-zZ\s]+$/, "Enter Valid First Name"),
      lastName: Yup.string()
        .trim()
        .required("First Name is  Required")
        .matches(/^[aA-zZ\s]+$/, "Enter Valid Last Name"),
      email: Yup.string()
        .email("Invalid email format")
        .matches(
          /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
          "Invalid email format"
        )
        .required("Email is Required"),
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
      // formValuesAcademic.map(e => e.passingYear = JSON.stringify(e.passingYear.$y));
      console.log(formValuesAcademic);
      let payload = {
        basicInfo: {
          firstName: values.firstName ? values.firstName : null,
          lastName: values.lastName ? values.lastName : null,
          email: values.email ? values.email : null,
        },
        academicInfo: [...formValuesAcademic],
        employementInfo: [...formValuesEmployement],
      };
      console.log(payload);
      id ? submitUpdateData(payload) : submitAddData(payload);
      // submitData(values);
      formik.resetForm();
    },
  });
  const submitAddData = async (e) => {
    dispatch(createUser(e));
    navigate("/");
  };
  const submitUpdateData = async (e) => {
    dispatch(updateUser(id, e));
    navigate("/");
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "15px",
                marginLeft: "100px",
                width: 700,
              }}
              color="textSecondary"
              gutterBottom
            >
              <h2>
                <span>{steps[step].label}</span>
              </h2>
            </Typography>
            <Box>
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
                </Grid>
              </FormikProvider>
            </Box>
          </>
        );
      case 1:
        return (
          <>
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "15px",
                marginLeft: "100px",
                width: 700,
              }}
              color="textSecondary"
              gutterBottom
            >
              <h2>
                <span>{steps[step].label}</span>
              </h2>
            </Typography>
            <Box>
              {formValuesAcademic?.map((element, index) => (
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
                              value={element.type || ""}
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
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
                            <InputLabel>School/College/University </InputLabel>
                            <TextField
                              {...field}
                              // disabled={formik.values.view ? true : false}
                              placeholder="Enter School/College/University"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
                              value={element.institute || ""}
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
                            <InputLabel required>Passing Year</InputLabel>
                            <Select
                              {...field}
                              size="small"
                              fullWidth
                              value={element.passingYear || ""}
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
                            >
                              {Array.from({ length: 100 }).map((_, index) => {
                                const year = formik.values.passingYear - index;
                                const isFutureYear = year > formik.values.passingYear;
                                return (
                                  <MenuItem
                                    key={year}
                                    value={year}
                                    disabled={isFutureYear}
                                  >
                                    {year}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </div>
                        )}
                      </Field>

                      {/* <Field name="passingYear">
                        {({ field, meta }) => (
                          <div>
                            <InputLabel required>Passing Year</InputLabel>
                            <TextField
                              {...field}
                              select
                              size="small"
                              fullWidth
                              inputProps={{ maxLength: 50 }}
                              value={element.passingYear || ""}
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
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
                      </Field> */}
                    </Grid>
                    <br />
                    {index ? (
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => removeFormFieldsAcademic(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                    <br />
                    <Grid item xs={9}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </FormikProvider>
              ))}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "37px",
                  marginLeft: "10px",
                  marginTop: "24px",
                }}
                variant="contained"
                color="success"
                onClick={() => addFormFieldsAcademic()}
              >
                Add
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography
              sx={{
                marginTop: "10px",
                marginBottom: "15px",
                marginLeft: "100px",
                width: 700,
              }}
              color="textSecondary"
              gutterBottom
            >
              <h2>
                <span>{steps[step].label}</span>
              </h2>
            </Typography>
            <Box>
              {formValuesEmployement?.map((element, index) => (
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
                              value={element.employeeCode || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                              value={element.companyName || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                              value={element.designation || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                    {index ? (
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => removeFormFieldsEmployement(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                    <br />
                    <Grid item xs={9}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
                </FormikProvider>
              ))}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "37px",
                  marginLeft: "10px",
                  marginTop: "24px",
                }}
                variant="contained"
                color="success"
                onClick={() => addFormFieldsEmployement()}
              >
                Add
              </Button>
            </Box>
          </>
        );
      default:
        throw new Error("Unknown step");
    }
  };
  useEffect(() => {
    if (id) {
      const user = users.find((_u) => _u.id == id);
      console.log("user", user);
      formik.setFieldValue("firstName", user?.basicInfo?.firstName);
      formik.setFieldValue("lastName", user?.basicInfo?.lastName);
      formik.setFieldValue("email", user?.basicInfo?.email);
      formik.setFieldValue("type", user?.academicInfo?.[0].type);
      formik.setFieldValue("institute", user?.academicInfo?.[0].institute);
      formik.setFieldValue("passingYear", user?.academicInfo?.[0].passingYear);
      formik.setFieldValue(
        "employeeCode",
        user?.employementInfo?.[0].employeeCode
      );
      formik.setFieldValue(
        "companyName",
        user?.employementInfo?.[0].companyName
      );
      formik.setFieldValue(
        "designation",
        user?.employementInfo?.[0].designation
      );
      if (
        user?.academicInfo?.length !== 0 &&
        user?.employementInfo?.length !== 0
      )
        setFormValuesAcademic(user?.academicInfo);
      setFormValuesEmployement(user?.employementInfo);
    }
  }, [users]);
  let addFormFieldsAcademic = () => {
    setFormValuesAcademic([
      ...formValuesAcademic,
      { type: "", institute: "", passingYear: "" },
    ]);
    console.log(formValuesAcademic);
  };
  let handleChangeInputAcademicYear = (i, e) => {
    // formik.setFieldValue("passingyear", e)
    formValuesAcademic[i].passingYear = e;
    let newFormValues = [...formValuesAcademic];
    setFormValuesAcademic(newFormValues);
  };
  let handleChangeInputAcademic = (i, e) => {
    let newFormValues = [...formValuesAcademic];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValuesAcademic(newFormValues);
  };
  let removeFormFieldsAcademic = (i) => {
    let newFormValues = [...formValuesAcademic];
    newFormValues.splice(i, 1);
    setFormValuesAcademic(newFormValues);
  };
  let addFormFieldsEmployement = () => {
    setFormValuesEmployement([
      ...formValuesEmployement,
      { employeeCode: "", companyName: "", designation: "" },
    ]);
  };
  let handleChangeInputEmployement = (i, e) => {
    let newFormValues = [...formValuesEmployement];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValuesEmployement(newFormValues);
  };
  let removeFormFieldsEmployement = (i) => {
    let newFormValues = [...formValuesEmployement];
    newFormValues.splice(i, 1);
    setFormValuesEmployement(newFormValues);
  };
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
      {/* <Box
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
            <Tab
              label="Academic Information"
              {...a11yProps(1)}
              disabled={
                formik?.values?.firstName === "" ||
                formik?.values?.lastName === "" ||
                formik?.values?.email === "" ||
                formik.errors.email === "Invalid email format"
                  ? true
                  : false
              }
            />
            <Tab
              label="Employment Information"
              {...a11yProps(2)}
              disabled={
                formik?.values?.firstName === "" ||
                formik?.values?.lastName === "" ||
                formik?.values?.email === "" ||
                formik.errors.email === "Invalid email format"
                  ? true
                  : false
              }
            />
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
                </Grid>
              </FormikProvider>
              <Grid item xs={3}>
                <div className={`col-2`}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      formik.setTouched({
                        firstName: true,
                        lastName: true,
                        email: true,
                      });
                      formik.validateForm().then((err) => {
                        if (err.firstName || err.lastName || err.email) {
                          return;
                        } else {
                          setValue(1);
                        }
                      });
                    }}
                  >
                    Next
                  </Button>
                </div>
              </Grid>
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
              {formValuesAcademic?.map((element, index) => (
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
                              value={element.type || ""}
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
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
                            <InputLabel>School/College/University </InputLabel>
                            <TextField
                              {...field}
                              // disabled={formik.values.view ? true : false}
                              placeholder="Enter School/College/University"
                              fullWidth
                              size="small"
                              onChange={(e) =>
                                handleChangeInputAcademic(index, e)
                              }
                              value={element.institute || ""}
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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                {...field}
                                  views={["year"]}
                                  onChange={(e) =>
                                    handleChangeInputAcademicYear(index, e)
                                  }
                                  value={element.passingYear || ""}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>
                        )}
                      </Field>
                    </Grid>
                    <br />
                    {index ? (
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => removeFormFieldsAcademic(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                    <br />
                    <Grid item xs={9}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}>
                      <div className={`col-2`}>
                        <Button
                          variant="contained"
                          sx={{
                            marginRight: "10px",
                          }}
                          onClick={() => {
                            setValue(0);
                          }}
                        >
                          Previous
                        </Button>
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
              ))}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "37px",
                  marginLeft: "10px",
                  marginTop: "24px",
                }}
                variant="contained"
                color="success"
                onClick={() => addFormFieldsAcademic()}
              >
                Add
              </Button>
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
              {formValuesEmployement?.map((element, index) => (
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
                              value={element.employeeCode || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                              value={element.companyName || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                              value={element.designation || ""}
                              onChange={(e) =>
                                handleChangeInputEmployement(index, e)
                              }
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
                    {index ? (
                      <IconButton
                        aria-label="delete"
                        color="error"
                        onClick={() => removeFormFieldsEmployement(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : null}
                    <br />
                    <Grid item xs={9}></Grid>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={3}>
                      <div className={`col-2`}>
                        <Button
                          variant="contained"
                          sx={{
                            marginRight: "10px",
                          }}
                          onClick={() => {
                            setValue(1);
                          }}
                        >
                          Previous
                        </Button>
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
              ))}
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "37px",
                  marginLeft: "10px",
                  marginTop: "24px",
                }}
                variant="contained"
                color="success"
                onClick={() => addFormFieldsEmployement()}
              >
                Add
              </Button>
            </CardContent>
          </Card>
        </TabPanel>
      </Box> */}
      <Box sx={{ maxWidth: 400 }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
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
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{handleSteps(activeStep)}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      // onClick={handleNext}
                      onClick={() => {
                        formik.setTouched({
                          firstName: true,
                          lastName: true,
                          email: true,
                        });
                        formik.validateForm().then((err) => {
                          if (err.firstName || err.lastName || err.email) {
                            return;
                          } else {
                            index === 2 ? formik.handleSubmit() : handleNext();
                          }
                        });
                      }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      {index === steps.length - 1 ? "Finish" : "Continue"}
                    </Button>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {/* {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )} */}
      </Box>
    </div>
  );
};

export default AddUser;
