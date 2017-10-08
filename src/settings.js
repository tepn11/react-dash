export var settings = {
  title: 'React-Dash v0.6.x -- Survey',
  queries: {},
  doFilterRouting: false,
  dataResources: {
    preEventData: {
      fetchData: {
        type: 'backend',
        backend: 'csv',
        url: 'http://ec2-13-58-184-238.us-east-2.compute.amazonaws.com/files/PreEventData.csv'
      },
    },
    // postEventData: {
    //   fetchData: {
    //     type: 'backend',
    //     backend: 'csv',
    //     // url: 'https://www.dropbox.com/s/hn3ky5pdr6n0nmn/postEventData.csv?dl=1'
    //     url: 'http://ec2-13-58-184-238.us-east-2.compute.amazonaws.com/files/postEventData2.csv'
    //   },
    // }
  },

  regions: [
    {
      id: 'top-row filters-row',
      className: 'row',
      children: [
        {
          type: 'Autocomplete',
          className: 'col-md-6',
          name: 'specialty-autocomplete',
          id: 'specialty-autocomplete',
          className: 'specialty-autocomplete',
          field: 'YearMonth',
          action: 'filter', // sort / groupBy / etc
          willFilter: ['preEventData'], // array of dkanDataResources keys that filters affect
          data: [
            [
              { label: '2010', value: '2010' },
              { label: '2011', value: '2011' },
              { label: '2012', value: '2012' },
              { label: '2013', value: '2013' },
              { label: '2014', value: '2014' },
              { label: '2015', value: '2015' },
            ]
          ],
          placeholder: 'Select year to filter dashboard...'
        }
      ]
    },
    {
      id: 'metrics-row',
      className: 'row',
      children: [
        {
          type: 'Metric',
          cardStyle: 'metric',
          iconClass: 'fa fa-level-up',
          className: 'col-md-4',
          background: "#00b3b3",
          caption: 'Number of pre-event surveys submitted',
          dataHandlers: [
            {
              name: 'getEventMetric',
              field: 'preEventCount'
            },
          ],
          stateHandlers: [
            {
              name: 'getMaxTempMetricColor',
              attr: 'bg'
            }
          ]
        }
      ]
    },
    {
      accordion: true,
      className: 'row',
      children: [
        {
          type: 'Region',
          className: 'row',
          dataTrigger: "Sample Header 2",
          children: [
            {
              type: 'Chart',
              cardClasses: ['col-md-6'],
              header: 'Agents',
              key: 'c1',
              // data: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}],
              dataHandlers: [
                {
                  name: 'getEventMetric',
                  field: 'agentsCount'
                },
              ],
              settings: {
                type: 'pieChart',
                height: 300
              }
            },
            {
              type: 'Chart',
              cardClasses: ['col-md-6'],
              header: 'Gender',
              key: 'c2',
              // data: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}],
              dataHandlers: [
                {
                  name: 'getEventMetric',
                  field: 'genderGrouping'
                },
              ],
              settings: {
                type: 'pieChart',
                height: 300
              }
            },
            {
              type: 'Chart',
              cardClasses: ['col-md-6'],
              header: 'Time of cooking per day',
              key: 'c3',
              // data: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}],
              dataHandlers: [
                {
                  name: 'getEventMetric',
                  field: 'howLonCookPerDayGrouping'
                },
              ],
              settings: {
                type: 'pieChart',
                height: 300
              }
            },
            {
              type: 'Chart',
              cardClasses: ['col-md-6'],
              header: 'Times per day family cooks',
              key: 'c4',
              // data: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}],
              dataHandlers: [
                {
                  name: 'getEventMetric',
                  field: 'howOftenFamilyCooksGrouping'
                },
              ],
              settings: {
                type: 'pieChart',
                height: 300
              }
            },
            {
              type: 'Chart',
              cardClasses: ['col-md-6'],
              key: 'c5',
              header: 'Sample data 2',
              data: [{label: 'x', values: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}]},
                {label: 'y', values: [{x: 'x', y: 15}, {x: 'y', y: 25}, {x: 'z', y: 35}]}],
              settings: {
                type: 'multiBarChart',
                height: 300
              },
            }  
          ]
        }
      ]
    },
    {
      id: 'map-row',
      className: 'row',
      children: [
        // choropleth
        {
          type: 'Choropleth',
          cardStyle: 'map',
          iconClass: 'fa fa-balance-scale',
          header: 'Palmer Hydrological Drought Index',
          format: 'topojson',
          dataHandlers: [
            {
              name: 'getMapData',
              stateArray: []
            }
          ],
          dataKeyField: 'name',
          dataValueField: 'PHDI',
          geometryKeyField: 'name',
          // geometry: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_data_0.4/map/usa.json', // topojson or geojson
          projection: 'albersUsa', // https://github.com/d3/d3/wiki/Geo-Projections
          scaleDenominator: .75,
          borderColor: 'yellow',
          noDataColor: 'yellow',
          topologyObject: 'usa',
          startColor: '#e6ffff',
          endColor: '#004d4d',
          dataClassification: 'equidistant',
          legend: {
            classesCount: 5,
            pallete:
							[
								"#e6ffff",
								"#00ffff",
								"#00cccc",
								"#00b3b3",
								"#009999",
								"#008080",
								"#004d4d"
							]
          },
        },
      ]
    },
    {
      id: 'text-row',
      className: 'row',
      children: [          
        {
          type: 'Iter',
          elType: 'Metric',
          iconClass: 'fa fa-question-circle',
          caption: 'Shared',
          header: 'header',
          subheader: 'subheader',
          topmatter: 'topmatter', 
          subheader2: 'subheader 2',
          topmatter2: 'topmatter2',
          footerHeader: 'footer header',
          footerSubheader: 'footer subheader',
          bottommatter: 'bottom matter',
          footerSubheader2: 'footer subheader 2',
          bottommatter2: 'bottommatter2',
          background: 'grey',
          rows: [
            {data: [123]},
            {data: [234], caption: 'overridden'},
            {data: [345], background: 'green'}
          ]
        }
      ]
    },
  /*  {
      id: 'appendix-row',
      children: [          
        {
          type: 'Iter',
          elType: 'Iter',
          cardClasses: ['row'],
          header: 'Iter Header I',
          rows: [
              {
                elType: 'Chart',
                header: 'Iter Header Ia',
                cardClasses: ['col-md-12'],
                rows: [
                  {
                    header: 'Chart Header 1a-i',
                    cardClasses: ['col-md-6'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                  {
                    header: 'Chart Header 1a-ii',
                    cardClasses: ['col-md-6'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                ]
              },
              {
                elType: 'Chart',
                header: 'Iter Header Ib-i',
                cardClasses: ['row'],
                rows: [
                  {
                    header: 'Chart Header 1b-ia',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                  {
                    header: 'Chart Header 1b-ib',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                  {
                    header: 'Chart Header 1b-ic',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                  {
                    header: 'Chart Header 1b-id',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300 
                    },
                  },
                ]
              }
            ]
          }
        ]
    },*/
    {
      id: 'chart-row',
      className: 'row',
      children: [
        {
          type: 'Chart',
          cardStyle: 'chart',
          header: 'Standard Precipitation Index',
          iconClass: 'fa fa-cloud',
          dataHandlers: [ 'getBarChartData' ],
          stateHandlers: [
            {
              name: 'isStatSignificant',
              attr: 'footer'
            }
          ],
          settings: {
            type: 'multiBarChart',
            x: 'x',
            y: 'y',
            height: 800
          }
        }
      ]
    }
  ]
}


let climateVars = {
			PCP: 'Precipitation Index',
			TAVG: 'Temperature Index',
			TMIN: 'Minimum Temperature Index',
			TMAX: 'Maximum Temperature Index',
			PDSI: 'Palmer Drought Severity Index',
			PHDI: 'Palmer Hydrological Drought Index',
			ZNDX: 'Palmer Z-Index',
			PMDI: 'Modified Palmer Drought Severity Index',
			CDD: 'Cooling Degree Days',
			HDD: 'Heating Degree Days',
			SPnn: 'Standard Precipitation Index'
		};

/**
 regions: [
 {
   id: 'top-row filters-row',
   className: 'row',
   children: [
     {
       type: 'Autocomplete',
       className: 'col-md-6',
       name: 'specialty-autocomplete',
       id: 'specialty-autocomplete',
       className: 'specialty-autocomplete',
       field: 'YearMonth',
       action: 'filter', // sort / groupBy / etc
       willFilter: ['climateData'], // array of dkanDataResources keys that filters affect
       data: [
         [
           { label: '2010', value: '2010' },
           { label: '2011', value: '2011' },
           { label: '2012', value: '2012' },
           { label: '2013', value: '2013' },
           { label: '2014', value: '2014' },
           { label: '2015', value: '2015' },
         ]
       ],
       placeholder: 'Select year to filter dashboard...'
     }
   ]
 },
 {
   accordion: true,
   className: 'row',
   children: [
     {
       type: 'Markup',
       dataTrigger: '',
       content: ''
     },
     {
       type: 'Markup',
       dataTrigger: "Sample Header 1",
       iconClass: 'fa fa-question-circle',
       content: '<p>Hydrological drought is described as a sustained and regionally extensive occurrence of below average natural water availability (Tallaksen and van Lanen, 2004). Hydrological drought as period of time below the average water content in streams, reservoirs, groundwater aquifers, lakes and soils. The period is associated effects of precipitation (including snowfall) shortfall on surface and subsurface water supply, rather than with direct shortfall in precipitation (Yevjevich et al., 1977). Hydrological drought may be the result of long term meteorological droughts that results in the drying up of reservoirs, lakes, streams, rivers and a decline in groundwater levels (Rathore 2004).</p>'
     },
     {
       type: 'Region',
       className: 'row',
       dataTrigger: "Sample Header 2",
       children: [
         {
           type: 'Chart',
           cardClasses: ['col-md-6'],
           header: 'Sample data 1',
           key: 'c1',
           data: [{x: 'x', y: 10}, {x: 'y', y: 20}, {x: 'z', y: 30}],
           settings: {
             type: 'pieChart',
             height: 300
           }
         },
         {
           type: 'Chart',
           cardClasses: ['col-md-6'],
           key: 'c2',
           header: 'Sample data 2',
           data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
           settings: {
             type: 'pieChart',
             height: 300
           },
         }
       ]
     },
     {
       type: 'Markup',
       dataTrigger: "Sample Header 3",
       iconClass: 'fa fa-question-circle',
       content: '<p>Hydrological drought is described as a sustained and regionally extensive occurrence of below average natural water availability (Tallaksen and van Lanen, 2004). Hydrological drought as period of time below the average water content in streams, reservoirs, groundwater aquifers, lakes and soils. The period is associated effects of precipitation (including snowfall) shortfall on surface and subsurface water supply, rather than with direct shortfall in precipitation (Yevjevich et al., 1977). Hydrological drought may be the result of long term meteorological droughts that results in the drying up of reservoirs, lakes, streams, rivers and a decline in groundwater levels (Rathore 2004).</p>'
     }
   ]
 },
 {
   id: 'metrics-row',
   className: 'row',
   children: [
     {
       type: 'Metric',
       cardStyle: 'metric',
       iconClass: 'fa fa-level-up',
       className: 'col-md-4',
       background: "#00b3b3",
       caption: 'Maximum Temp.',
       dataHandlers: [
         {
           name: 'getClimateMetric',
           field: 'TMAX'
         },
       ],
       stateHandlers: [
         {
           name: 'getMaxTempMetricColor',
           attr: 'bg'
         }
       ]
     },
     {
       type: 'Metric',
       cardStyle: 'metric',
       iconClass: 'fa fa-level-down',
       className: 'col-md-4',
       background: '#009999',
       caption: 'Minimum Temp.',
       dataHandlers: [
         {
           name: 'getClimateMetric',
           field: 'TMIN'
         }
       ]
     },
     {
       type: 'Metric',
       cardStyle: 'metric',
       iconClass: 'fa fa-fire',
       className: 'col-md-4',
       caption: 'Average Temp/',
       background: '#004d4d',
       dataHandlers: [
         {
           name: 'getClimateMetric',
           field: 'TAVG'
         }
       ]
     }
   ]
 },
 {
   id: 'map-row',
   className: 'row',
   children: [
     // choropleth
     {
       type: 'Choropleth',
       cardStyle: 'map',
       iconClass: 'fa fa-balance-scale',
       header: 'Palmer Hydrological Drought Index',
       format: 'topojson',
       dataHandlers: [
         {
           name: 'getMapData',
           stateArray: stateIds
         }
       ],
       dataKeyField: 'name',
       dataValueField: 'PHDI',
       geometryKeyField: 'name',
       geometry: 'https://dl.dropboxusercontent.com/u/73703010/react_dash_data_0.4/map/usa.json', // topojson or geojson
       projection: 'albersUsa', // https://github.com/d3/d3/wiki/Geo-Projections
       scaleDenominator: .75,
       borderColor: 'yellow',
       noDataColor: 'yellow',
       topologyObject: 'usa',
       startColor: '#e6ffff',
       endColor: '#004d4d',
       dataClassification: 'equidistant',
       legend: {
         classesCount: 5,
         pallete:
           [
             "#e6ffff",
             "#00ffff",
             "#00cccc",
             "#00b3b3",
             "#009999",
             "#008080",
             "#004d4d"
           ]
       },
     },
   ]
 },
 {
   id: 'text-row',
   className: 'row',
   children: [
     {
       type: 'Iter',
       elType: 'Metric',
       iconClass: 'fa fa-question-circle',
       caption: 'Shared',
       header: 'header',
       subheader: 'subheader',
       topmatter: 'topmatter',
       subheader2: 'subheader 2',
       topmatter2: 'topmatter2',
       footerHeader: 'footer header',
       footerSubheader: 'footer subheader',
       bottommatter: 'bottom matter',
       footerSubheader2: 'footer subheader 2',
       bottommatter2: 'bottommatter2',
       background: 'grey',
       rows: [
         {data: [123]},
         {data: [234], caption: 'overridden'},
         {data: [345], background: 'green'}
       ]
     }
   ]
 },
 /*  {
      id: 'appendix-row',
      children: [
        {
          type: 'Iter',
          elType: 'Iter',
          cardClasses: ['row'],
          header: 'Iter Header I',
          rows: [
              {
                elType: 'Chart',
                header: 'Iter Header Ia',
                cardClasses: ['col-md-12'],
                rows: [
                  {
                    header: 'Chart Header 1a-i',
                    cardClasses: ['col-md-6'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                  {
                    header: 'Chart Header 1a-ii',
                    cardClasses: ['col-md-6'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                ]
              },
              {
                elType: 'Chart',
                header: 'Iter Header Ib-i',
                cardClasses: ['row'],
                rows: [
                  {
                    header: 'Chart Header 1b-ia',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                  {
                    header: 'Chart Header 1b-ib',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                  {
                    header: 'Chart Header 1b-ic',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                  {
                    header: 'Chart Header 1b-id',
                    cardClasses: ['col-md-3'],
                    data: [{x: 'x', y: 110}, {x: 'y', y: 920}, {x: 'z', y: 430}],
                    settings: {
                      type: 'pieChart',
                      height: 300
                    },
                  },
                ]
              }
            ]
          }
        ]
    },
{
  id: 'chart-row',
    className: 'row',
  children: [
  {
    type: 'Chart',
    cardStyle: 'chart',
    header: 'Standard Precipitation Index',
    iconClass: 'fa fa-cloud',
    dataHandlers: [ 'getBarChartData' ],
    stateHandlers: [
      {
        name: 'isStatSignificant',
        attr: 'footer'
      }
    ],
    settings: {
      type: 'multiBarChart',
      x: 'x',
      y: 'y',
      height: 800
    }
  }
]
}
]
*/