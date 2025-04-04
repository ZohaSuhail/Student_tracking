"use client"
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import MonthSelection from '../_services/_components/MonthSelection';
import GradeSelect from '../_services/_components/GradeSelect';
import GlobalApi from '../_services/GlobalApi';
import moment from 'moment/moment';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';

function Dashboard() {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList,setAttendanceList]=useState();
  const [totalPresentData,setTotalPresentData]=useState([]);


  useEffect(() => {
    //setTheme('system');
    getStudentAttendance();
    GetTotalPresentCountByDay();
    
    
  }, [selectedMonth , selectedGrade])

  

  const getStudentAttendance = () => {
    GlobalApi.GetAttendanceList(selectedGrade, moment(selectedMonth).format('MM/YYYY'))
      .then(resp => {
        //console.log(resp.data)
        setAttendanceList(resp.data);
      })
  }
  const GetTotalPresentCountByDay=()=>{
    GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/YYYY'),selectedGrade)
    .then(resp => {
      //console.log(resp.data)
      setTotalPresentData(resp.data);
      })
  }
  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold tet-2xl'>Dashboard</h2>

        <div className='flex items-center gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>

      </div>
       <StatusList attendanceList={attendanceList}/> 

       <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
         <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData}/>
         </div>
         <div>
          <PieChartComponent attendanceList={attendanceList}/>
         </div>
       </div>
    </div>
  )
}

export default Dashboard


