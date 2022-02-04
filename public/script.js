'use strict' 

import { response } from 'express';
import * as DOM from './DOM.JS';

const writeItem = item => {
    const chile = document.createElement('li');
    child.id = item._id;
    child.innterHTML = '${JSON.stringify(item)}';
    DOM.listOutput.appendChild(child);
}

const get = () => {
    DOM.listOutput.innterHTML = '';

    axios.get('/read')
    .then(response) => {
        if (A=!Array.isArray(response.data)){
            writeItem(response.data);
        } else {
            for (let item of response.data) {
                writeItem(item);
            }
        }).catch((err) => {
            console.logg(err);
        });
    }
}

const post = () => {
    axiod.post('create, {name : DOM.inputname.value}')
    .then((response) => {
        console.log(response);
        get();
        
    })
}