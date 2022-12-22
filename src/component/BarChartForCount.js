import { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Chart from 'react-apexcharts';
import _ from 'lodash';
import Card from '@material-ui/core/Card';




function BarChartForCount() {

    const [data] = useState([
        {
            totalCount:22,girlCount:13,boysCount:7,standardName:"1st Std",totalCountInWords:22,girlsCountInWords:13,boysCountInWords:7
            },
            {
            totalCount:15,girlCount:7,boysCount:8,standardName:"2st Std",totalCountInWords:15,girlsCountInWords:7,boysCountInWords:8
            },
            {
            totalCount:16,girlCount:10,boysCount:5,standardName:"3st std",totalCountInWords:16,girlsCountInWords:10,boysCountInWords:5
            },
            {
            totalCount:1,girlCount:0,boysCount:1,standardName:"4st std",totalCountInWords:0,girlsCountInWords:1,boysCountInWords:0
            },
    ])
    const menuData = data;

    const [bartData, setBarData] = useState({
        options: {},
        series : []
    });

	useEffect( () => {    
        if ( menuData !== undefined && ! _.isEmpty(menuData) ) {
            
            if ( menuData !== undefined && ! _.isEmpty(menuData) ) {
                let tempCategories = [];
                let totalObj = { name: 'Total', data:[] };
                
                menuData.forEach( element => {
                    totalObj.data.push(Number(element.totalCount));
                    tempCategories.push(element.standardName);
                });
                let tempSeries = [totalObj];


                let tempOptions =  {
                    series: [
                        {
                            name: 'Total',
                            tempOptions: [menuData.totalCount]
                        }
                    ]
                        ,
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 1,
                        colors: ['transparent']
                    },
                    xaxis: {
                        categories: tempCategories,
                        title: {
                            text: ''
                          }
                    },
                    yaxis: {
                        title: {
                          text: 'Total Student'
                        }
                    },
                    fill: {
                        opacity: 2
                    },
                    colors: ['#3d85c6'],
                    
                    tooltip: {
                        y: {
                            formatter: function (val) {
                                return val + "Count"
                            }
                        }
                    }
                }
                setBarData({ options: tempOptions, series : tempSeries });
            }
        }
    }, [menuData]);

	return (
       
            <div className="w-200 md:ml-5">
            {
                ! _.isEmpty(bartData.series)
                ?                  
                <Card className="rounded md:mt-12 h-5/6 ">
                    <Typography color="inherit" className="text-16 p-2 text-center sm:text-18  tracking-tight">
                        <div className='font-bold'>
                        Standardwise Student Count
                        </div>
                
                    </Typography>
                    <div className='p-2 md:m-0 md:m-5 m-2 w-100 '>
                    <Chart options={bartData.options} series={bartData.series} type="bar" width = "100%" height="210px"/>
                    </div>
                    
                </Card>
                :
                ""
            }
            </div>
	);
}

export default BarChartForCount;

