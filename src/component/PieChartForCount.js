import { useState,useEffect } from "react"
import axios from 'axios';
import _ from 'lodash';
import Typography from '@material-ui/core/Typography';
import Chart from 'react-apexcharts';
import Card from '@material-ui/core/Card';

export default function PieChartForCount(){

    const [piechartData, setPieChartData] = useState({
        options: {},
        series: []
    });

    const [datasetstatus, setDataSetStatus] = useState(false);

    const [data,setData] = useState('')

    console.log("data",data.responseList)

    const menuData = data.responseList?.[0]

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

      
    useEffect(() => {
        if (menuData !== undefined && !_.isEmpty(menuData)) {
            let data = {
                options: {
                    labels: ['Total', 'Boys', 'Girls'],
                    legend: {
                        show: false
                    },

                    colors: ['#50af51', '#EB504E', '#f5a623',],
                    fill: {
                        colors: ['#50af51', '#EB504E', '#f5a623',]
                    },
                    tooltip: {
                        custom: function ({ series, seriesIndex }) {
                            let return_value =
                                seriesIndex === 0
                                    ? `Boys: ${menuData.boysCount}`
                                    : `Girls: ${menuData.girlsCount}`;
                            let background =
                                seriesIndex === 0 ? 'background-color: #50af51' : 'background-color:#EB504E';
                            return `<div style='padding: 5px; ${background}'> ${return_value}  </div>`;
                        }
                    }
                },
                series: [
                    Math.round
                        (menuData.boysCount)
                    ,
                    Math.round(menuData.girlsCount)
                ]
            };
            setPieChartData(data);
            setDataSetStatus(true);
        }
    }, [menuData]);
     
    return(
        <div> <Card className=" rounded p-2 md:m-0 md:m-5 md:mr-0 md:ml-0  mb-2 w-300 rounded md:mt-12">
        <Typography color="inherit" className="text-16 mt-10 mb-10 mi-10 text-left sm:text-18 font-bold tracking-tight text-center text-gray-700">
        {/* {StringsOfLanguages?.getString('division' , currentLanguageId)} {`${selected_Divison.divisionName}`} */}
        <div className='font-bold'>
        Total Boys And Girl Count 
                        </div>
        </Typography>
    
 
        {
            (menuData?.totalCount > 0) ?
                <div className="md:flex flex-row md:items-center w-full justify-center">
                    <div className="flex justify-center">
                    <Chart
                        className=""
                        height={290}
                        options={piechartData.options}
                        series={piechartData.series}
                        type="pie"
                        width="100%"
                    />
                    </div>
                    <div className="flex md:flex-col seesionInfoSection justify-center">
                        <div className="rounded seesionInfo flex flex-col">
                            <div className="examCountLabel w-full text-center p-2">Total</div>
                            <div className="atExamCount w-full text-center p-1">
                                {menuData.totalCount}
                            </div>
                        </div>
                        <div className="rounded seesionInfo flex flex-col md:mb-2 md:mt-2 md:ml-0 md:mr-0 ml-2 mr-2 ">
                            <div className="examCountLabel w-full text-center p-2">Boys</div>
                            <div className="aExamCount w-full text-center p-1">
                                {menuData.boysCount}
                            </div>
                        </div>
                        <div className="rounded seesionInfo flex flex-col">
                            <div className="examCountLabel w-full text-center p-2">Girls</div>
                            <div className="tExamCount w-full text-center p-1">
                                {menuData.girlsCount}
                            </div>
                        </div>
                    </div>
                </div>
                :
                datasetstatus === true
                    ?

                    <Typography color="inherit" className="text-14 mt-20 ml-20 text-red-400 text-left sm:text-18 font-bold tracking-tight">
                  No data
                    </Typography>

                    :
                    ""             
        }
    </Card></div>
    )
}