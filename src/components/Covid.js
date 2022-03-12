import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";


// chartsjs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// ends here

const Div = styled(Paper)(() => ({
  margin: "20px",
  padding: "20px",
}));

export default function Covid() {

  const getCovid = async () => {
    const response = await fetch(
      "https://corona.lmao.ninja/v2/countries?yesterday&sort"
    );
    const data = await response.json();
    setCovidApi(data);
  };

  const [covidApi, setCovidApi] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    getCovid();
  }, []);
  

  // charts data
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['All time data'];
  console.log("cuntry data: ",selectedCountry)
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Cases',
        data: [selectedCountry.cases && selectedCountry.cases.toString()],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Reacovered',
        data: [selectedCountry.recovered && selectedCountry.recovered.toString()],
        backgroundColor: 'rgba(206, 252, 168, 0.747)',
      },
      {
        label: 'Deaths',
        data: [selectedCountry.deaths && selectedCountry.deaths.toString()],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
    
    
  };
  


  return (
    <Box sx={{ flexGrow: 1 }}>
      <div className="country-container">
        <select name="cars" id="cars" className="countries">
          <option onClick={() => setSelectedCountry({})}>select country </option>
          {covidApi.map((obj) => {
            return (
              <option onClick={() => setSelectedCountry(obj)}>
                {obj.country}
              </option>
            );
          })}
        </select>
      </div>

      <Grid className="container" container spacing={2}>
        <Grid item xs={8} md={4}>
          <Div className="confirmed_cases covid-data">
            <h1>CASES</h1>
            <h3>
              {!selectedCountry ? "loading..." : selectedCountry && selectedCountry.cases}
            </h3>

            <div className="todays_conf_cases">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry ? "loading...": selectedCountry && selectedCountry.todayCases}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={8} md={4}>
          <Div className="recovered covid-data">
            <h1>RECOVERED</h1>
            <h3>
              {!selectedCountry? "loading...": selectedCountry && selectedCountry.recovered}
            </h3>
            <div className="todays_recovered">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry? "loading...": selectedCountry && selectedCountry.todayRecovered}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        <Grid item xs={8} md={4}>
          <Div className="deaths covid-data">
            <h1>DEATHS</h1>
            <h3>
              {!selectedCountry ? "loading...": selectedCountry && selectedCountry.deaths}
            </h3>
            <div className="todays_deaths">
              <h3>
                last 24 hours:{" "}
                <span>
                  {!selectedCountry ? "loading...": selectedCountry && selectedCountry.todayDeaths}
                </span>
              </h3>
            </div>
          </Div>
        </Grid>
        
      </Grid>
      <Bar className='Barchart' options={options} data={data} />;
    </Box>
  );
}
