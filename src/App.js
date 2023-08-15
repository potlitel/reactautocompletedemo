import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import logo from "./assets/img/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png";
import "./App.css";
function App() {
  let [data, setdata] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  // 3. Create out useEffect function
  useEffect(() => {
    fetch("https://therichpost.com/testjsonapi/users/")
      .then((response) => response.json())
      // 4. Setting *data* to the API DATA that we received from the response above
      .then((data) => setdata(data));
  }, [data]);

  return (
    <div>
      {/* <span class="inline-block align-baseline">Alain</span> */}
      {/* <div class="fixed inset-0 flex items-center justify-center">
        <div class="bg-white rounded-lg p-16 text-green-600">GeeksforGeeks</div>
      </div> */}
      <div className="flex items-center justify-center flex-col m-auto h-screen">
        {/* <h3>Country select</h3>
        <p>Choose one of the 248 countries.</p>
        <br /> */}
        <div>
          <h2 className="text-2xl font-bold text-center">{`selectedId: ${
            value !== null ? `'${value.id}'` : "null"
          }`}</h2>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center">{`selectedValue: '${inputValue}'`}</h2>
        </div>

        <div className="text-2xl font-bold text-center">
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            // value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            disablePortal
            id="combo-box-demo"
            options={data}
            getOptionLabel={(option) => option.name}
            sx={{ width: 550 }}
            renderOption={(props, option, { inputValue }) => {
              const matches = match(option.name, inputValue, {
                insideWords: true,
              });
              const parts = parse(option.name, matches);

              return (
                <Box
                  className="hover:opacity-25"
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <img
                    className="bg-transparent rounded-xl"
                    loading="lazy"
                    width="40"
                    src={logo}
                    alt=""
                  />
                  {option.name} ({option.job_title}) - {option.email}
                </Box>
              );
            }}
            // renderInput={(params) => <TextField {...params} label="Users" />}
            renderInput={(params) => (
              <TextField {...params} label="Choose an user" margin="normal" />
            )}
          />
        </div>
        {/* <div class="grid place-items-center h-screen">
        Centered using Tailwind Grid
      </div> */}
      </div>
    </div>
  );
}

export default App;
