import { getUniqueRecord } from '@/app/_services/service';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';

function StatusList({ attendanceList }) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPerc, setPresentPerc] = useState(0);

    useEffect(() => {
        //console.log("Raw Attendance List:", attendanceList);
        if (attendanceList) {
            
           const totalSt=getUniqueRecord(attendanceList);
           //console.log("Unique Students Array:", totalSt);
           setTotalStudent(totalSt.length);

           const today=moment().format('D');
           //console.log("Today's Date (D format):", today);
           
           const PresentPerc =(attendanceList.length/(totalSt.length*Number(today))*100);
           //console.log(PresentPerc)
           setPresentPerc(PresentPerc);
        }

    }, [attendanceList])
    return (
        <div className='grid grid-cols-1 gap-5 my-6 md:grid-cols-2 lg:grid-cols-3'>
           <Card icon={<GraduationCap />} title='Total Student' value={totalStudent} />
           <Card icon={<TrendingUp />} title='Total Present' value={presentPerc.toFixed(1)+'%'} />
           <Card icon={<TrendingDown />} title='Total Absent' value={(100-presentPerc).toFixed(1)+'%'} />
        </div>
    )
}

export default StatusList
