import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
// import { Formik } from "formik";
import { Field, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
// import TextField from "@mui/material/TextField";
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

const AddUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const { name, username, email, phone, website } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
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
    }),
    onSubmit: (values) => {
      console.log(values);
      // alert(JSON.stringify(values, null, 2));
      id ? submitUpdateData(values) : submitAddData(values)
      // submitData(values);
      
    },
  });
  const submitAddData = async (e) => {
    // e.preventDefault();
    await axios.post("https://60decafeabbdd9001722d05c.mockapi.io/users", e);
    navigate("/landing-page");
  };
  const submitUpdateData = async (e) => {
    await axios.put(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`, e);
    navigate("/landing-page");
  };
  const loadUser = async () => {
    const result = await axios.get(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`
    );
    // setUser(result.data);
    formik.setFieldValue("firstName", result.data.firstName)
    formik.setFieldValue("lastName", result.data.lastName)
    formik.setFieldValue("email", result.data.email)
  };
  useEffect(() => {
    loadUser();
  }, []);
  return (
    // <Formik
    //   initialValues={{
    //     name: "",
    //     username: "",
    //     email: "",
    //     phone: "",
    //     website: "",
    //   }}
    //   validationSchema={validate}
    //   onSubmit={(values) => {
    //     console.log(values);
    //   }}
    // >
    //   {(formik) => (
    //     <div className="container">
    //       <div className="w-75 mx-auto shadow p-5">
    //         <h2 className="text-center mb-4">Add A User</h2>
    //         <form onSubmit={(e) => onSubmit(e)}>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               className="form-control form-control-lg"
    //               placeholder="Enter Your Name"
    //               name="name"
    //               value={name}
    //               onChange={(e) => onInputChange(e)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               className="form-control form-control-lg"
    //               placeholder="Enter Your Username"
    //               name="username"
    //               value={username}
    //               onChange={(e) => onInputChange(e)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input
    //               type="email"
    //               className="form-control form-control-lg"
    //               placeholder="Enter Your E-mail Address"
    //               name="email"
    //               value={email}
    //               onChange={(e) => onInputChange(e)}
    //             />
    //             <TextField
    //               fullWidth
    //               id="email"
    //               name="email"
    //               label="Email"
    //               value={formik.values.email}
    //               onChange={formik.handleChange}
    //               error={formik.touched.email && Boolean(formik.errors.email)}
    //               helperText={formik.touched.email && formik.errors.email}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               className="form-control form-control-lg"
    //               placeholder="Enter Your Phone Number"
    //               name="phone"
    //               value={phone}
    //               onChange={(e) => onInputChange(e)}
    //             />
    //           </div>
    //           <div className="form-group">
    //             <input
    //               type="text"
    //               className="form-control form-control-lg"
    //               placeholder="Enter Your Website Name"
    //               name="website"
    //               value={website}
    //               onChange={(e) => onInputChange(e)}
    //             />
    //           </div>
    //           <button className="btn btn-primary btn-block">Add User</button>
    //         </form>
    //       </div>
    //     </div>
    //   )}
    // </Formik>
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          <h2>
            <span>Basic information</span>
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
                      variant="outlined"
                      inputProps={{ maxLength: 50 }}
                      {...{ error: meta.touched && meta.error }}
                      helperText={meta.touched && meta.error && meta.error}
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
                      variant="outlined"
                      inputProps={{ maxLength: 50 }}
                      {...{ error: meta.touched && meta.error }}
                      helperText={meta.touched && meta.error && meta.error}
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
                      fullWidth
                      inputProps={{ maxLength: 50 }}
                      {...{ error: meta.touched && meta.error }}
                      helperText={meta.touched && meta.error && meta.error}
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
                <button
                  type="submit"
                  onClick={() => {
                    formik.handleSubmit();
                  }}
                >
                  Submit
                </button>
              </div>
            </Grid>
          </Grid>
        </FormikProvider>
      </CardContent>
    </Card>
  );
};

export default AddUser;
