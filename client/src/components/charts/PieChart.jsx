import React, { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import { red, yellow } from '@mui/material/colors';

Chart.register(...registerables);

const CryptoByVolumePieChart = () => {
    const theme = useTheme();

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
        // sort it by total_volume in descending order,
        // take top 3 results using slice
        // and then map 
        labels: chartData.sort((a, b) => b.total_volume - a.total_volume).slice(0, 3).map(coin => coin.name),
        datasets: [
            {
                data: chartData.sort((a, b) => b.total_volume - a.total_volume).slice(0, 3).map(coin => coin.total_volume),
                backgroundColor: [

                    'rgb(64, 122, 214)',
                    red[600],
                    yellow[800],
                ],
                borderWidth: 1,
                borderColor: colors.common.white,
            },
        ],
    };
    
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateScale: true,
        },
        plugins: {
            legend: {
                display: true,
                padding: 30,
                labels: {
                    color: 'rgb(30, 32, 34)',
                    font: {
                        size: 14,
                    },
                },
            },
            datalabels: {
                display: true,
                color: colors.common.white,
                align: 'center',
                labels: {
                    title: {
                        font: {
                            weight: 'bold',
                            size: 13,
                        },
                    },
                },
                formatter: (value) => numeral(value).format('$0,0.00'),
            },
        },
    };

    return (
        <div className='carousel-item  grid plac-items-center'>
        <Card className='place-self-center'>
            <CardHeader 
                title='Top 3 Cryptocurrencies By Volume' 
                subheader='Top 3 Cryptocurrencies Measured By Their Total Volume' 
            />
            <Divider />
            <CardContent>
                <Box sx={{ height: 400, width: 500, position: 'relative' }}>
                    <Pie
                        data={data} 
                        options={options} 
                        plugins={[ChartDataLabels]} 
                    />
                </Box>
            </CardContent>
        </Card>
        </div>
    );
};

export default CryptoByVolumePieChart;