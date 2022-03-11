import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Div = styled(Paper)(() => ({
  margin: "20px",
  padding: "20px",
}));

export default function Covid() {
  const [covidApi, setCovidApi] = useState([]);

  useEffect(() => {
    getCovid();
  }, []);

  const getCovid = async () => {
    const response = await fetch(
      "https://corona.lmao.ninja/v2/countries?yesterday&sort"
    );
    const data = await response.json();
    setCovidApi(data);
    console.log("data api: ", data);
  };
  console.log("covid api: ", covidApi[0]);
  let [selectedCountry, setSelectedCountry] = useState({});

  console.log("selected: ", selectedCountry);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="country-container">
        <select name="cars" id="cars" className="countries">
          <option>select country </option>
          {covidApi.map((obj) => {
            return (
              <option onClick={() => setSelectedCountry(obj)}>
                {obj.country}
              </option>
            );
          })}
        </select>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <Div className="confirmed_cases covid-data">
            <h1>CONFIRMED CASES</h1>
            <h3>
              {!selectedCountry
                ? "loading..."
                : selectedCountry && selectedCountry.cases}
            </h3>

            <div className="todays_conf_cases">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry
                    ? "loading..."
                    : selectedCountry && selectedCountry.todayCases}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Div className="deaths covid-data">
            <h1>DEATHS</h1>
            {/* <p>{covidApi[0]["deaths"]}</p> */}
            <h3>
              {!selectedCountry
                ? "loading..."
                : selectedCountry && selectedCountry.deaths}
            </h3>
            <div className="todays_deaths">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry
                    ? "loading..."
                    : selectedCountry && selectedCountry.todayDeaths}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Div className="recovered covid-data">
            <h1>RECOVERED</h1>
            {/* <p>{covidApi[0]["recovered"]}</p> */}
            <h3>
              {!selectedCountry
                ? "loading..."
                : selectedCountry && selectedCountry.recovered}
            </h3>
            <div className="todays_recovered">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry
                    ? "loading..."
                    : selectedCountry && selectedCountry.todayRecovered}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Div className="tests covid-data">
            <h1>TOTAL TESTS</h1>
            {/* <p>{covidApi[0]["recovered"]}</p> */}
            <h3>
              {!selectedCountry
                ? "loading..."
                : selectedCountry && selectedCountry.tests}
            </h3>
            <div className="todays_tests">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry
                    ? "loading..."
                    : selectedCountry && selectedCountry.todayCases}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={6} md={4}>
          <Div className="critical_cases covid-data">
            <h1>CRITICAL CASES</h1>
            {/* <p>{covidApi && covidApi[0].recovered}</p> */}
            <h3>
              {!selectedCountry
                ? "loading..."
                : selectedCountry && selectedCountry.critical}
            </h3>
            <div className="todays_critical_cases">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry
                    ? "loading..."
                    : selectedCountry && selectedCountry.critical}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
      </Grid>
    </Box>
  );
}
