import React, { useEffect, useState } from 'react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment/moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';
import { getUniqueRecord } from '@/app/_services/service';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [10, 25, 50];


function AttendanceGrid({ attendanceList,selectedMonth }) {

    const [rowData, setRowData] = useState();
    const [colDefs, setColDefs] = useState([
        { field: 'studentId' , headerName: 'Student Id' , filter:true},
        { field: 'name' , headerName:'Name' , filter:true},
    ])

    const daysInMonth=(year,month)=>new Date(year,month,0).getDate();
    const numberOfDays=daysInMonth(moment(selectedMonth).format('YYYY'),moment(selectedMonth).format('M'));
    //console.log(numberOfDays);
    const daysArrays=Array.from({length:numberOfDays},(_,i)=>i+1)
    //console.log(daysArrays);

    useEffect(() => {
        const userList = getUniqueRecord(attendanceList);
        //console.log(userList);
        setRowData(userList);

        daysArrays.forEach((date)=>{
            setColDefs(prevData=>[...prevData,{
                field:date.toString(),width:50,editable:true
            }])

            userList.forEach(obj=>{
                obj[date]=isPresent(obj.studentId,date)
            })
        })
    }, [attendanceList])

    

    const isPresent=(studentId,day)=>{
        const result=attendanceList.find(item=>item.day==day&&item.studentId==studentId)
        return result?true:false
    }

    

    const onMarkAttendance=(day,studentId,presentStatus)=>{

        const date=moment(selectedMonth).format('MM/YYYY')
        if(presentStatus)
        {
            const data={
                day:day,
                studentId:studentId,
                present:presentStatus,
                date:date
            }

            GlobalApi.MarkAttendance(data).then(resp=>{
                console.log(resp);
                toast('Student Id:' +studentId+ 'Marked as present')
            })
            
            
        } 
        else{
           GlobalApi.MarkAbsent(studentId,day,date)
           .then(resp=>{
            toast('Student Id:' +studentId+ 'Marked as absent')
           })
        }   
    }
    
    
    return (
        <div>
            <div style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e)=>onMarkAttendance(e.colDef.field,e.data.studentId,e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    )
}

export default AttendanceGrid
