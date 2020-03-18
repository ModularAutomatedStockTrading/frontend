import React, {useState} from 'react';
import Select, { components } from 'react-select';

const stocksUp = ["Apple up", "Amazon up", "Google up", "Microsoft up"];
const stockUpOptions = [];
for(const stock of stocksUp){
    stockUpOptions.push({
        value : `stockup/${stock}`,
        type : `stockup`,
        label : stock
    });
}

const stocksDown = ["Apple down", "Amazon down", "Google down", "Microsoft down"];
const stockDownOptions = [];
for(const stock of stocksDown){
    stockDownOptions.push({
        type : `stockdown`,
        value : `stockdown/${stock}`,
        label : stock
    });
}

export const options = [
  {
    label: 'Stocks up',
    options: stockUpOptions,
  },
  {
    label: 'Stocks down',
    options: stockDownOptions,
  }
];

export default function OutputOptions(props){
    return <div style={{position : "relative"}}>
        <Select
            menuPlacement="top"
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