import { useEffect, useState } from 'react';
import Typography from "@material-ui/core/Typography";
import Chart from 'react-apexcharts';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import axios from 'axios';



function BarChartForCount() {

    const [data,setData] = useState('')

    console.log("data",data.responseList)

    const menuData = data.responseList?.[1]?.standardwiseStudentList


    async function fetchData() {
        try {
          const response = await axios.get("http://3.109.35.243:8088/StandardWiseStrength?schoolId=1059000001&profileRole=Principal&yearId=1059000006&renewAdmissionDate=21-12-2022")
          setData(response.data)
        } catch (error) {
          console.error(error);
        }
      }
    
      useEffect(()=>{
        fetchData()
      },[])

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
                    colors: ['#3d85c6'], //'#f5a623' , '#50af51', '#EB504E','#f5a623'
                    fill: {
                        colors: ['#3d85c6'] //'#f5a623'
                    },
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

