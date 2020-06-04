import React from 'react';

import classes from './Order.module.css';

const order=(props)=>(
    <div className={classes.Order}>
        <p>Ingredients: Meat (1)</p>
        <p>TotalPrice : <strong>USD 4.53</strong> </p>
    </div>
);

export default order;