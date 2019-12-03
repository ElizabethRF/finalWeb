import React, { Component, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addData } from '../store/EmploymentData/action'; 


const RenderD = (dispatch,dat) =>{
    console.log('ELI',dat);
    if(dat){
        console.log("DATA TRUE");
        dat.info.map(row => (
            dispatch(addData(row.year, row.period, row.total, row.men, row.women))
        ));  
    }

     
   
    /*for( var i = 0; i<33 ; i++){
        dispatch(addData(2018, "enero", i, 3.12, 1.1)); 
    }*/
}; 

export default function LoadData(props){
    const dispatch = useDispatch();
    const val = RenderD(dispatch,props); 
    console.log("PROPS",props);
    return(
        <div>{val}</div>
    );   
}
