import React, { Component } from "react";
import axios from "axios";

class City extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            zipcode: []
         };
    }

    componentDidMount() {
        axios 
        .get("http://ctp-zip-api.herokuapp.com/city/SPRINGFIELD")
        .then((response) => {
            const data = response.data;
            console.log(data);
            const newZipObj = {
                zipcode: data
            };

            this.setState({zipcode: newZipObj});
        })
        .catch((err) => console.log(err));
    }


    render() {
        let display;
        if(!this.state.zipcode.zipcode) {
            display = <p>Loading...</p>;
        } else {
            display = (
                <>
                <ul>
                    {this.state.zipcode.zipcode.map((zipcode) => <li key= { zipcode }> {zipcode} </li>)}
                
                </ul>
                </>
            );
        }

        return <div className ="cityName">{display}</div>
    }
}

export default City;