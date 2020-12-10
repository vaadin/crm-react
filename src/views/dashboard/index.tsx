import React, { useEffect } from 'react';
import type { FC } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useDispatch, useSelector } from '../../store';
import { State } from '../../reducers';
import { getCompanyInfo } from '../../reducers/companyInfo';

const sumReducer = (sum: number, cur: number) => sum + cur;
const getChartData = (data: any) => {
  return Object.entries(data).map(([key, value]) => {
    return {
      name: key,
      count: value
    };
  });
};

let chart: any;

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: State) => state.companyInfo);

  useEffect(() => {
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    am4core.useTheme(am4themes_animated);
    chart = am4core.create('chartdiv', am4charts.PieChart);
    chart.data = getChartData(data);
    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'count';
    pieSeries.dataFields.category = 'name';

    return function cleanup() {
      if (chart) {
        chart.dispose();
      }
    };
  }, [data]);

  return (
    <div className="App-header">
      <h1>{Object.values(data).reduce(sumReducer, 0)} Contacts</h1>
      <div id="chartdiv" style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default Dashboard;
