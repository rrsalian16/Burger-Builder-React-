import React, {Component} from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        
        axios.get('/orders.json')
        .then(res=>{
            const fetchedOrder=[];
            for(key in res.data){
                fetchedOrder.push({
                    ...res.data[key],
                    id:key
                })
            }
            this.setState({ loading: false });
        })
        .catch(error=>{
            this.setState({ loading: false });
        });
    }
    render(){
        return (
          <div>
            <Order />
            <Order />
          </div>
        );
    }
}

export default Orders;