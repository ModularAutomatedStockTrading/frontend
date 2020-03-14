import React, {useState} from 'react';
import './index.css';
import Select, { components } from 'react-select';

const stocks = ["Apple", "Amazon", "Google", "Microsoft"];
const stockOptions = [];
for(const stock of stocks){
    stockOptions.push({
        type : 'stock',
        value : `stock/${stock}`,
        label : stock
    });
}

const metrics = [
    "Price-to-Earnings Ratio",
    "Price-to-Book Ratio",
    "Debt-to-Equity",
    "Free Cash Flow",
    "PEG Ratio",
    "The Bottom Line"
];
const metricOptions = [];
for(const metric of metrics){
    metricOptions.push({
        type : 'metric',
        value : `metric/${metric}`,
        label : metric
    })
};

export const options = [
  {
    label: 'Stocks',
    options: stockOptions,
  },
  {
    label: 'Metrics',
    options: metricOptions,
  }
];

export default function InputOptions(props){
    return <div style={{position : "relative"}}>
        <Select
            required
            onChange={(val) => {
                props.onPick(val);
            }}
            value={props.value}
            options={options}
            components={{ Group : components.Group }}
        />
        <input
            tabIndex={-1}
            autoComplete="off"
            style={{ opacity: 0, height: 0, position : "absolute" }}
            value={props.value ? props.value.value : ""}
            required
        />
    </div>
}