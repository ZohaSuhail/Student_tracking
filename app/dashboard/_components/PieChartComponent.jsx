import { getUniqueRecord } from '@/app/_services/service'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

function PieChartComponent({attendanceList}) {
    const data01 = [
        {
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 300
        },
    ]
    const [data,setData]=useState([])
    useEffect(() => {
            //console.log("Raw Attendance List:", attendanceList);
            if (attendanceList) {
                
               const totalSt=getUniqueRecord(attendanceList);
               //console.log("Unique Students Array:", totalSt);
               //setTotalStudent(totalSt.length);
    
               const today=moment().format('D');
               //console.log("Today's Date (D format):", today);
               
               const PresentPerc =(attendanceList.length/(totalSt.length*Number(today))*100);
               //console.log(PresentPerc)
               //setPresentPerc(PresentPerc);
               setData([
                {
                    name:'Total Present',
                    value:Number(PresentPerc.toFixed(1)),
                    fill:"#8884d8"
                },
                {
                    name:'Total Absent',
                    value:100-Number(PresentPerc.toFixed(1)),
                    fill:"#82ca9d"
                },
               ])
            }
    
        }, [attendanceList])
    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Monthly Attendance</h2>
            <ResponsiveContainer width={'100%'} height={300}>
                <PieChart width={730} height={250}>

                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80}  label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
