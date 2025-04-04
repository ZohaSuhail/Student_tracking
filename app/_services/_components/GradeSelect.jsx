'use client'
import React, { useState, useEffect } from 'react';
import GlobalApi from '../GlobalApi';

function GradeSelect({selectedGrade}) {

    const [grades, setGrades] = useState([]);

    useEffect(() => {
        GetAllGradesList();
    }, [])

    const GetAllGradesList = () => {
        GlobalApi.GetAllGrades().then(resp => {
            //console.log(resp.data)
            setGrades(resp.data)
        })
    }
    return (
        <div>
            <select className='bg-white p-2 border rounded-lg'
            onChange={(e) => selectedGrade(e.target.value)}>
                {grades.map((item, index) => (
                    <option key={index} value={item.grade}>{item.grade}</option>
                ))}


            </select>
        </div>
    )
}

export default GradeSelect
