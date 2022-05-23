import { CircularProgress, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import SelectButton from "./utilities/SelectButton";
import { SingleCoin, HistoricalCoin } from "./utilities/CryptoAPI";
import axios from "axios";

const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },];

const CoinLineChart = () => { //{ coin }

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  // const [coin, setCoin] = useState()
  const currency = 'USD'; 
  const coin_id = 'bitcoin';
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin('bitcoin'))
    console.log(data);
    setCoin(data);
  }
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalCoin(coin_id, days, currency));//currency
    setHistoricData(data.prices);
  };

  // useEffect(() => {
  //   fetchCoin();
  // }, [])
  useEffect(() => {
    fetchHistoricData();
  }, [days])

  if (!coin_id) return <LinearProgress style={{ backgroundColor: "yellow" }} />;
  return (
        <div className="carousel-item grid place-items-center">
        <Card className="place-self-center">
            <CardHeader 
                title= {coin_id} 
                subheader='Price of Coin Currency over time' 
            />
            <Divider />
            <CardContent>
                <Box sx={{ height: 450, width: 800, position: 'relative' }}>
                    {!historicData?(
                      <CircularProgress
                        style={{color:"yellow"}}
                        size={250}
                        thickness={1}/>
                    ):(
                    <>
                      <Line
                      data={{
                        labels: historicData.map((coin) => {
                          let date = new Date(coin[0]);
                          let time =
                            date.getHours() > 12
                              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                              : `${date.getHours()}:${date.getMinutes()} AM`;
                          return days === 1 ? time : date.toLocaleDateString();
                        }),
        
                        datasets: [
                          {
                            data: historicData.map((coin) => coin[1]),
                            label: `Price ( Past ${days} Days ) in ${currency}`,
                            borderColor: "#EEBC1D",
                          },
                        ],
                      }}
                      options={{
                        elements: {
                          point: {
                            radius: 1,
                          },
                        },
                      }}
                      />
                      <div
                        style={{
                          display: "flex",
                          marginTop: 20,
                          justifyContent: "space-around",
                          width: "100%",
                        }}>
                          {chartDays.map((day) => (
                            <SelectButton
                              key={day.value}
                              onClick={() => {setDays(day.value);
                                setflag(false);
                              }}
                              selected={day.value === days}
                            >
                              {day.label}
                            </SelectButton>
                          ))}
                      </div>
                    </>
                    )}
                </Box>
            </CardContent>
        </Card>
        </div>
  );
}
 
export default CoinLineChart;