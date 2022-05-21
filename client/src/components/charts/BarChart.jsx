import React, { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { deepPurple, lightBlue, pink, purple, teal, lime, yellow, red, green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';

Chart.register(
    BarElement,
    CategoryScale,
    LinearScale
);

const BarChart = () => {
    const theme = useTheme();
    const isMd = useMediaQuery(
        theme.breakpoints.up('md'),
        { defaultMatches: true }
    );

    const [chartData, setChartData] = useState([]);

    const fetchTopCoins = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false', {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setChartData(response.data);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchTopCoins();
    }, []);

    const data = {
        // copy data from the state to a new array,
        // sort it by current_price in descending order,
        // take top 10 results using slice
        // and then map 
        labels: chartData.sort((a, b) => b.current_price - a.current_price).slice(0, 10).map(coin => coin.name),
        datasets: [{
            data: chartData.sort((a, b) => b.current_price - a.current_price).slice(0, 10).map(coin => coin.current_price),
            label: `${chartData.length} Most Expensive Cryptocurrencies`,
            backgroundColor: [
                    yellow[800],
                    red[600],
                    'rgb(31, 102, 239)',
                    green[600],
                    deepPurple[600],
                    pink[400],
                    lightBlue[300],
                    teal[400],
                    purple[300],
                    lime[500]
                ],
        }],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: isMd ? true : false,
                color: 'rgb(30, 32, 34)',
                anchor: 'end',
                align: 'top',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 9,
                        },
                        padding: 10,
                    },
                },
                formatter: (value) => numeral(value).format('$0,0.00'),
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(30, 32, 34)',
                    maxRotation: 45,
                    minRotation: 45,
                },
                title: {
                    display: true,
                    text: 'Cryptocurrencies',
                    color: 'rgb(30, 32, 34)',
                    font: {
                        weight: 'bold',
                        size: 18,
                    },
                    padding: 10,
                },
            },
            y: {
                ticks: {
                    color: 'rgb(30, 32, 34)',
                    padding: 10,
                    callback: (value) => numeral(value).format('$0,0.00')
                },
                display: true,
                borderDash: [5, 5],
                title: {
                    display: true,
                    text: 'Current price',
                    color: 'rgb(30, 32, 34)',
                    font: {
                        weight: 'bold',
                        size: 18,
                    },
                    padding: 10,
                },
            },
        },
    };

    return (
        <Card>
            <CardHeader 
                title='Top 10 Most Expensive Cryptocurrencies' 
                subheader='Top 10 Most Expensive Cryptocurrencies Measured By Their Market Price' 
            />
            <Divider />
            <CardContent>
                <Box sx={{ height: 300, width: 650, position: 'relative' }}>
                    <Bar
                        data={data} 
                        options={options} 
                        plugins={[ChartDataLabels]} 
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default BarChart;