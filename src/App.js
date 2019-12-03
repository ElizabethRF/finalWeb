import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import PrincipalView from './components/PrincipalView';
import BarGraph from './components/BarGraph';
import LineGraph from './components/LineGraph';
import PieGraph from './components/PieGraph';
import RenderData from './components/RenderData';

import API, { graphqlOperation } from '@aws-amplify/api';
import awsconfig from './aws-exports';
API.configure(awsconfig);

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
  state = { unemployment: []}

  async  componentDidMount() {
    const data = await API.graphql(graphqlOperation(query));
    this.setState({
      unemployment: data.data.listUnemployments.items
    })
  }

  render() {
    return(
      <div>
      <RenderData/>
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
      {
        this.state.unemployment.map((unemploymentData,index)=>(
          <p key={index}> {unemploymentData.year}</p>
        ))
      }
    </div>
    );
    
  }
}

export default App;