import React, {useState} from 'react';
import Select, { components } from 'react-select';
import {useSelector} from 'react-redux'

export default function ModelTemplatePicker(props){
    const modelTemplates = Object.values(useSelector(state => state.modelTemplate));
    return <div style={{position : "relative"}}>
        <Select
            required
            onChange={(val) => {
                props.onPick(val);
            }}
            value={props.value}
            options={modelTemplates.map((modelTemplate, idx) => {
                return {
                    value : modelTemplate._id,
                    label : modelTemplate.name
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