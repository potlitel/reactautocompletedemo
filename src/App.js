import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  let [data, setdata] = useState(null);
  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://therichpost.com/testjsonapi/users/")
      .then((response) => response.json())
      // 4. Setting *data* to the API DATA that we received from the response above
      .then((data) => setdata(data));
  }, []);

  return (
    <div className="App">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={data}
        getOptionLabel={(option) => option.name}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Users" />}
      />
    </div>
  );
}

export default App;
