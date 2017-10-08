import { DataHandler } from 'react-dash'
import { find, min, max, mean, isArray } from 'lodash';

function groupBy(collection, property) {
  var i = 0, val, index,
    values = [], result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1)
      result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
}

let customDataHandlers = {
  // getClimateMetric: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
  //   let data = dashboardData.climateData;
  //   let output;
  //
  //   if (isArray(data) && data.length > 0) {
  //     if (handler.field === 'TMIN') {
  //       output = data.map(r => { return r.TMIN });
  //       return [min(output)]
  //     }
  //
  //     if (handler.field === 'TMAX') {
  //       output = data.map(r => { return r.TMAX });
  //       return [max(output)]
  //     }
  //
  //     if (handler.field === 'TAVG') {
  //       output = data.map(r => { return parseInt(r.TAVG) });
  //       return [mean(output).toPrecision(4)];
  //       let n = mean(output).toPrecision(4);
  //       return [n];
  //     }
  //   }
  //
  //   return ["..."];
  // },

  getEventMetric: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let preEventData = dashboardData.preEventData;
    let postEventData = dashboardData.postEventData;
    let output;
    let data;

    // console.log('data',data);
    if (isArray(preEventData) && preEventData.length > 0) {
      if (handler.field === 'preEventCount') {
        return [preEventData.length];
      }

      if (handler.field === 'agentsCount') {
        data = groupBy(preEventData, 'Auditor');
        output = data.map(r => {
          return { x: r[0].Auditor, y: r.length };
        });
        return output;
      }

      if (handler.field === 'ageGrouping') {
        // data = groupBy(preEventData, 'AGE');
        data = preEventData.reduce((ret, next) => {
          if (next['AGE'] < 20){
            ret['<20'].push(next);
          } else if (next['AGE'] >= 20 && next['AGE'] < 30){
            ret['20-29'].push(next);
          } else if (next['AGE'] >= 30 && next['AGE'] < 40){
            ret['30-39'].push(next);
          } else if (next['AGE'] >= 40 && next['AGE'] < 50){
            ret['40-49'].push(next);
          } else if (next['AGE'] >= 50){
            ret['50+'].push(next);
          }
          return ret;
        }, {});
        output = [];
        for (var p in data) {
          if( data.hasOwnProperty(p) ) {
            output.push({ x: data[p], y: p.length });
          }
        }
        return output;
      }

      if (handler.field === 'genderGrouping') {
        data = groupBy(preEventData, 'GENDER');
        output = data.map(r => {
          return { x: r[0].GENDER, y: r.length };
        });
        return output;
      }
      if (handler.field === 'howLonCookPerDayGrouping') {
        data = groupBy(preEventData, 'HOW LONG DOES IT TAKE TO COOK/DAY?');
        output = data.map(r => {
          return { x: r[0]['HOW LONG DOES IT TAKE TO COOK/DAY?'], y: r.length };
        });
        return output;
      }
      if (handler.field === 'howOftenFamilyCooksGrouping') {
        data = groupBy(preEventData, 'HOW OFTEN DOES YOUR FAMILY COOK MEALS');
        output = data.map(r => {
          return { x: r[0]['HOW OFTEN DOES YOUR FAMILY COOK MEALS'], y: r.length };
        });
        return output;
      }
      //
      // if (handler.field === 'TAVG') {
      //   output = data.map(r => { return parseInt(r.TAVG) });
      //   return [mean(output).toPrecision(4)];
      //   let n = mean(output).toPrecision(4);
      //   return [n];
      // }
    }
    if (isArray(postEventData) && postEventData.length > 0) {
      if (handler.field === 'preEventCount') {
        return [postEventData.length];
      }
    }

    return ["..."];
  },


  // @@TODO clean up NAN values
  getMapData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    let field = 'PHDI';
    let NaNRows = {};
    let _data = dashboardData.climateData;
    let mapped;
    
    if (_data && _data.length > 0) {
      mapped = _data.map(row => {
        
        Object.keys(row).forEach((k) => {
          row[k] = Number(row[k]);
          if (row[k] === -99.99 )  row[k] = 0; // not sure the cause of this but ain't got time to sort it out
        });

        // assign label from stateArray to row, based on matching id
        let state = find(handler.stateArray, r => {
         return ( r.value === row.StateCode ) 
        });

        if (state) {
          row.name = state.label;
        }
        
        return row;
      });
    }

    return mapped;
  },

  getBarChartData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    const indicators = [ 'SP01', 'SP06', 'SP12', 'SP24' ];
    const colors = [
      '#edf8fb',
      '#ccece6',
      '#99d8c9',
      '#66c2a4',
      '#2ca25f',
      '#006d2c',
    ];
    let _data = dashboardData.climateData || [];
    let series = indicators.map((ind, i) => {
      let data = _data.map(row => {
        return {
          x: row['YearMonth'],
          y: row[ind]
        }
      }).filter(row => {
        return (!isNaN(row.y) && row.y > -10 && row.y < 10);
      });
      return {key: ind, values: data, color: colors[i]}
    });

    return series;
  },

  getTableData: function (componentData, dashboardData, handler, e, appliedFilters, pipelineData) {
    console.log(arguments);
    if (dashboardData.climateData) {
      return dashboardData.climateData;
    }
  }
}

for (let k in customDataHandlers) {
  DataHandler.set(k, customDataHandlers[k]);
}

/**
 * Helpers
 **/
let _inYear = function (row, years) {
  let y = row.YearMonth.toString().substring(0,4);
  return (years.indexOf(y) >= 0);
}

let _inState = function (row, states) {
  return (states.indexOf(row.StateCode) >= 0);
}

export default customDataHandlers;
