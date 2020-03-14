import React, {useState} from 'react';
import Select, { components } from 'react-select';
import {useSelector} from 'react-redux'

export default function InputOptions(props){
    const models = Object.values(useSelector(state => state.model));
    return <div style={{position : "relative"}}>
        <Select
            required
            onChange={(val) => {
                props.onPick(val);
            }}
            value={props.value}
            options={models.map((model, idx) => {
                return {
                    value : model._id,
                    label : model.name
                }
            })}
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