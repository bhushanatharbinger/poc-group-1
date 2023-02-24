import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

function Landing() {
    var columns = [
        { title: "id", field: "id", hidden: true },
        { title: "First name", field: "first_name" },
        { title: "Last name", field: "last_name" },
        { title: "email", field: "email" }
    ];
    const [data, setData] = useState([]); //table data
    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    console.log(iserror)
    console.log(errorMessages)
    let [user] = useState([{
        id: 2,
        email: "janet.weaver@reqres.in",
        first_name: "Janet",
        last_name: "Weaver",
    }]);

    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = [];
        if(errorList.length < 1){
          axios.patch("/users/"+newData.id, newData)
            .then(res => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setData([...dataUpdate]);
              resolve()
              setIserror(false)
              setErrorMessages([])
            })
            .catch(error => {
              setErrorMessages(["Update failed! Server error"])
              setIserror(true)
              resolve()
          })
        }else{
          setErrorMessages(errorList)
          setIserror(true)
          resolve()
        }
      }
      const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if(newData.first_name === undefined){
          errorList.push("Please enter first name")
        }
        if(newData.last_name === undefined){
          errorList.push("Please enter last name")
        }
        if(newData.email === undefined){
          errorList.push("Please enter a valid email")
        }
        if(errorList.length < 1){ //no error
          axios.post("/users", newData)
            .then(res => {
              let dataToAdd = [...data];
              dataToAdd.push(newData);
              setData(dataToAdd);
              resolve()
              setErrorMessages([])
              setIserror(false)
           })
           .catch(error => {
              setErrorMessages(["Cannot add data. Server error!"])
              setIserror(true)
              resolve()
            })
        }else{
          setErrorMessages(errorList)
          setIserror(true)
          resolve()
        }
      }
      const handleRowDelete = (oldData, resolve) => {
        axios.delete("/users/"+oldData.id)
          .then(res => {
            const dataDelete = [...data];
            const index = oldData.tableData.id;
            dataDelete.splice(index, 1);
            setData([...dataDelete]);
            resolve()
          })
          .catch(error => {
            setErrorMessages(["Delete failed! Server error"])
            setIserror(true)
            resolve()
          })
      }
    useEffect(() => {
        setData(user)
    }, [user])
    return (
        <div className="container">
            <MaterialTable
                title="User list from API"
                columns={columns}
                data={data}
                // icons={tableIcons}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            handleRowUpdate(newData, oldData, resolve);
                        }),
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            handleRowAdd(newData, resolve)
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            handleRowDelete(oldData, resolve)
                        }),
                }}
            />
        </div>
    );
}

export default Landing;

