import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState, useEffect } from "react";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import logo from "../assets/img/png-clipart-computer-icons-user-profile-avatar-profile-heroes-profile.png";
import { UsersAPI } from "../services/UsersAPI";
import { notification, Spin } from "antd";
const { REACT_APP_API_ENDPOINT } = process.env;
const AutocompleteCtl = () => {
  let [data, setdata] = useState(null);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [pokemonListLoading, setPokemonListLoading] = useState(false);
  // 3. Create out useEffect function
  useEffect(() => {
    setPokemonListLoading(true);
    UsersAPI.getAll()
      .then((data) => {
        setdata(data);
      })
      .finally(() => {
        setPokemonListLoading(false);
        notification.success({
          placement: "bottomRight",
          description: "All user data was obtained satisfactorily!",
        });
      });
    // console.log({ REACT_APP_API_ENDPOINT });
    // fetch(`${REACT_APP_API_ENDPOINT}/users/`)
    //   .then((response) => response.json())
    //   .then((data) => setdata(data))
    //   .finally(() => {
    //     setPokemonListLoading(false);
    //     notification.success({
    //       placement: "bottomRight",
    //       description: "All user data was obtained satisfactorily!",
    //     });
    //   });
  }, []);
  return (
    <div>
      <Spin spinning={pokemonListLoading}>
        <div className="flex items-center justify-center flex-col m-auto h-screen">
          <div>
            <h2 className="text-2xl font-bold text-center">{`selectedId: ${
              value !== null ? `'${value.id}'` : "null"
            }`}</h2>
            {/* <li>My env: {REACT_APP_MY_ENV}</li> */}
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
        </div>
      </Spin>
    </div>
  );
};

export default AutocompleteCtl;
