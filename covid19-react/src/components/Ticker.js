import React from 'react'

class Cards extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          totalStats: {},
          testStats: {}

        };
      }


    componentDidMount() {
        fetch("https://api.covid19india.org/data.json")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                totalStats: result.statewise[0],
                testStats : result.tested[result.tested.length-1]
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
      }




   render(){
    const { isLoaded, totalStats ,testStats } = this.state;
    console.log(testStats);
    var mortalityRate = totalStats.deaths/totalStats.confirmed*100;
    mortalityRate = (Math.round(mortalityRate * 100) / 100).toFixed(2);
    var  recoveryRate = totalStats.recovered/totalStats.confirmed*100;
    recoveryRate = (Math.round(recoveryRate * 100) / 100).toFixed(2);
    if(!isLoaded)
   {

    return <div>No data</div>
   }
   else{

  return (
  
    <div>
        <div className="row">

        <div className="column">
            <div className="card">
                <h2>Confirmed Cases </h2>
            
                <span  id="totalConfirmedCases">{totalStats.confirmed}</span>
                <h2>Confirmed Today </h2>
                <span id="confirmedToday">{totalStats.deltaconfirmed}</span>
                <h2>Active Cases </h2>
                <span id="activeCases">{totalStats.active}</span>
                <h5> <span id="lastUpdatedLive1"></span> </h5>

            </div>
        </div>

        <div className="column">
            <div className="card">
                <h2>Recovered </h2>
                <span id="totalRecovered">{totalStats.recovered}  </span>
                <h2>Recovered Today </h2>
                <span id="recoveredToday">{totalStats.deltarecovered} </span>
                <h2>Recovery Rate</h2>
                <span id="recoveryRate">{recoveryRate} </span>
                <h5> <span id="lastUpdatedLive3"></span> </h5>
            </div>

        </div>
            <div className="column">
            <div className="card">
                <h2>Deaths </h2>
                <span id="totalDeaths">{totalStats.deaths} </span>
                <h2>Deaths Today </h2>
                <span id="deathsToday">{totalStats.deltadeaths} </span>
                <h2>Mortality Rate</h2>
                <span id="mortalityRate">{mortalityRate} </span>
                <h5> <span id="lastUpdatedLive2"></span> </h5>
            </div>

        </div>
            <div className="column">
            <div className="card">
                <h2>Total Tests</h2>
                <span id="totalTestsDone">{testStats.totalsamplestested} </span>
                <h2>Tests Done Today</h2>
                <span id="testDoneToday">{testStats.samplereportedtoday} </span>
                <h2>Tests / 1M pop</h2>
                <span id="testspermillion">{testStats.testspermillion} </span>
            <h5> <span id="lastUpdated"></span> </h5>
            </div>
        </div>
        </div>

    </div>
  );

  }
  }
}

export default Cards