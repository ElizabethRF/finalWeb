import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import PrincipalView from './components/PrincipalView';
import BarGraph from './components/BarGraph';
import LineGraph from './components/LineGraph';
import PieGraph from './components/PieGraph';
import RenderData from './components/RenderData';
import LoadData from './components/LoadData';
import { useDispatch } from 'react-redux'
import {addData} from '../src/store/EmploymentData/action'; 



import API, { graphqlOperation } from '@aws-amplify/api';
import awsconfig from './aws-exports';
import SignInWithFacebook from './components/SignInWithFacebook';
API.configure(awsconfig);


const RenderD = (dispatch) =>{
  for( var i = 0; i<33 ; i++){
      dispatch(addData(2018, "enero", i, 3.12, 1.1)); 
  }
  
  
}; 


function ds(){

}
const query =`
  query list{
    listUnemployments{
      items{
        id
        period
        year
        total
        men
        women
      }
    }
  }
  
`

class App extends Component {
  //state = { unemployment: []}
  constructor(props){
    super(props);
    this.datosss = []; 
    this.state ={
     loadDataa : false
     ,unemployment: []
    }
     
  }

  async  componentDidMount() {
    const data = await API.graphql(graphqlOperation(query));
    this.datosss = data.data.listUnemployments.items; 
    console.log("DATA",this.datosss);

   this.setState({
      unemployment: data.data.listUnemployments.items,
      loadDataa : true
    })
  }

  render() {
    return(
      <div>
        <SignInWithFacebook/>
        { this.state.loadDataa  &&
          <LoadData info={(this.state.unemployment)}/> 
        }
      
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/BarGraph">
              <BarGraph/>
            </Route>
            <Route path="/LineGraph">
              <LineGraph/>
            </Route>
            <Route path="/PieGraph">
              <PieGraph/>
            </Route>
            <Route path="/">
              <PrincipalView/>
            </Route>
          </Switch>
      </div>
    </Router>
    <h1>SOS</h1>
      
    </div>
    );
    
  }
}

export default App;