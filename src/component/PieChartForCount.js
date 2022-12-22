import { useState,useEffect } from "react"
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

    const [data,setData] = useState([
        {totalCount:226,girlsCount:109,boysCount:117,totalCountInWords:'226',girlsCountInWords:'109',boysCountInWords:'117'}
    ]);

    const dataNew = [{totalCount:226,girlsCount:109,boysCount:117,totalCountInWords:'226',girlsCountInWords:'109',boysCountInWords:'117'}]

    const menuData = data;

    console.log(data)

 
    useEffect(() => {
        if (menuData[0] !== undefined && !_.isEmpty(menuData[0])) {
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
                                    ? `Boys: ${menuData[0].boysCount}`
                                    : `Girls: ${menuData[0].girlsCount}`;
                            let background =
                                seriesIndex === 0 ? 'background-color: #50af51' : 'background-color:#EB504E';
                            return `<div style='padding: 5px; ${background}'> ${return_value}  </div>`;
                        }
                    }
                },
                series: [
                    Math.round
                        (menuData[0].boysCount)
                    ,
                    Math.round(menuData[0].girlsCount)
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
            (menuData[0]?.totalCount > 0) ?
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
                                {menuData[0].totalCount}
                            </div>
                        </div>
                        <div className="rounded seesionInfo flex flex-col md:mb-2 md:mt-2 md:ml-0 md:mr-0 ml-2 mr-2 ">
                            <div className="examCountLabel w-full text-center p-2">Boys</div>
                            <div className="aExamCount w-full text-center p-1">
                                {menuData[0].boysCount}
                            </div>
                        </div>
                        <div className="rounded seesionInfo flex flex-col">
                            <div className="examCountLabel w-full text-center p-2">Girls</div>
                            <div className="tExamCount w-full text-center p-1">
                                {menuData[0].girlsCount}
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