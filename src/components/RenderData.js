import React, { Component, useEffect } from 'react';
import * as d3 from 'd3';
import data from '../data/data.csv';
import { useDispatch } from 'react-redux'
import { addData } from '../store/EmploymentData/action'; 


const RenderD = (dispatch) =>{
    /*for( var i = 0; i<3 ; i++){
        dispatch(addData(2018, "enero", i, 3.12, 1.1)); 
    }*/
    
    let year; 
    
    d3.csv(data, function(data) { 
        //data.Total ?  dispatch(addData(year, data.Periodo, data.Total, data.Hombres, data.Mujeres)):  year = data.Periodo  ; 
        dispatch(addData('2018', "enero", 10, 3.12, 1.1)); 

    });
}; 

export default function RenderData(){
    const dispatch = useDispatch();
    //const [val, setVal] = useState(0); 
    //useEffect(()=> {setVal(RenderD(dispatch))},[])
    const val = RenderD(dispatch); 
    
    return(
        <div>{val}</div>
    );   
}
