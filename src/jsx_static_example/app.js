/**
 * This example shows how to build a basic dashboard using available components
 * and basic React JSX syntax.
 *
 **/


// start read-the-docs example

/**
 * Import the required elements
 **/
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Dashboard, Region, Card, Metric, Chart } from 'react-dash'


/**
 * Extend the application and provide a render method
 **/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { preEvent: [], postEvent:[], count: 2 };
  }

  fetchData() {
    fetch('http://localhost:3004/data', {
      mode: "cors",
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
    .then(result => {
      result.json()
        .then((data) => {
          this.setState({
            preEvent: data[0].preEvent,
            postEvent: data[0].postEvent,
            preEventCount: data[0].preEvent.length
          }, this.increaseCount);
        });

    });
  }

  increaseCount() {
    this.setState((prevState) => {
      return {count: prevState.count + 1};
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  componentDidMount() {
    this.fetchData();
    const refreshIntervalId  = setInterval(() => {
      // this.state.data.datasets[0].data.shift();
      // this.state.data.datasets[0].data.push(this.getRandomInt(0, 90));
      //
      // this.state.data.datasets[1].data.shift();
      // this.state.data.datasets[1].data.push(this.getRandomInt(0, 90));
      var count = this.getRandomInt(0, 90);
      this.setState({
        count: count,
        refreshIntervalId,
      });
    }, 2000);
  }

  render() {
    return (

    /**
    * Use the Dashboard component to wrap your
    * dashboard elements
    **/
    <Dashboard title="A Simple Dashboard Writ in JSX" doFilterRouting={false}>
      <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
      
      <div className="row">
        <Metric 
          caption='Count'
          data={[this.state.count]}
          background='#687a99'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bed'
        />
        <Metric
          caption='PreEvent Count'
          data={[this.state.preEventCount]}
          background='#689994'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bomb'
        />
        <Metric
          caption='Caption C'
          data={[3]}
          background='#8f6899'
          cardClasses={['col-md-4']}
          iconClass='fa fa-bathtub'
        />
      </div>
      <div className="row">
        <Chart 
          header="Header 1"
          iconClass="fa fa-cloud"
          cardClasses={['col-md-6']}
          key="chart1"
          data={[{x: 'foo', y: 10}, {x: 'bar', y: 20}, {x: 'bax', y: 30}]}
          settings={
            {
              type: 'pieChart',
              height: 300
            }
          }
        />
        <Chart 
          header="Header 2"
          iconClass="fa fa-cogs"
          cardClasses={['col-md-6']}
          key="chart2"
          data={[{x: 'Eeny', y: 1122}, {x: 'Meeny', y: 2220}, {x: 'Miney', y: 910}]}
          settings={
            {
              type: 'pieChart',
              height: 300,
            }
          }
        />
      </div>
    </Dashboard>
    )
  }
}

document.addEventListener('DOMContentLoaded', function(event) {
    ReactDOM.render(<App/>, document.getElementById('root'));
});

// end read-the-docs example
