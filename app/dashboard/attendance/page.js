'use client'
import GradeSelect from '@/app/_services/_components/GradeSelect'
import MonthSelection from '@/app/_services/_components/MonthSelection'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
import AttendanceGrid from './_components/AttendanceGrid';


function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList,setAttendanceList] = useState();
  
  const onSearchHandler = () => {
      //console.log(selectedMonth,selectedGrade);
      const month=moment(selectedMonth).format('MM/YYYY');
      //console.log(month);
      GlobalApi.GetAttendanceList(selectedGrade,month).then(resp=>{
        //console.log(resp.data);
        setAttendanceList(resp.data);
      })
  }
  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>
        Attendance
      </h2>

      <div className='flex gap-4 p-3 my-3 border rounded-lg'>

        <div className='flex gap-2 items-center'>
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>

        <div className='flex gap-2 items-center '>
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(v)=>setSelectedGrade(v)}/>
        </div>

        <Button onClick={() => onSearchHandler()}>
          Search
        </Button>

      </div>
      <AttendanceGrid attendanceList={attendanceList} 
      selectedMonth={selectedMonth}
      />
    </div>
  )
}

export default Attendance
