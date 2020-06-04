import React, { Component } from "react";
import axios from "axios";

class City extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            zipcode: [],
            cityName: null
         };
        this.handleChange = this.handleChange.bind(this);
    }


    //COMPONENTDIDUPDATE IS USED INSTEAD OF COMPONENTDIDMOUNT BECAUSE COMPONENTDIDUPDATE ONLY RUNS IF STATE IS UPDATED
    //FOR THE USER INPUT AND COMPONENTDIDMOUNT RUNS EITHER WAY REGARDLESS OF WHETHER STATE IS UPDATED OR NOT
    componentDidUpdate() {
        axios 
        .get("http://ctp-zip-api.herokuapp.com/city/" + this.state.cityName.toUpperCase())
        .then((response) => {
            const data = response.data;
            const newZipObj = {
                zipcodeList: data
            };

            this.setState({zipcode: newZipObj});
        })
        .catch((err) => console.log(err));
    }

    //HANDLECHANGE DEALS WITH CHANGING THE STATE OF THE INPUT FIELD AND SAVING IT 
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value,
        });
      }

    //RENDER() HAS A CONDITION WHICH DEALS WITH IF THE USER HAS ENTERED A VALID CITY NAME, 
    //THEN THE LIST OF ZIPCODES WILL DISPLAY USING THE MAP METHOD IN DISPLAY METHOD.
    //IF IT IS NOT A VALID CITY NAME, THEN WILL DISPLAY LOADING...
    render() {
        let display;
        if(!this.state.zipcode.zipcodeList) {
            display = <p>Loading...</p>;
        } else {
            console.log(this.state.cityName);
            display = (
                <>
                <ul>
                    {this.state.zipcode.zipcodeList.map((zipcode) => <li key= { zipcode }> {zipcode} </li>)}
                
                </ul>
                </>
            );
        }

        //RETURN PROMPTS USER TO ENTER CITY IN THE TEXTFIELD AND DISPLAY THE ZIPCODES USING THE MAP METHOD FROM DISPLAY FUNCTION
        return(
        <div>
            <p> Enter city to retrieve zipcodes: </p>
            <input
                type= "text"
                name = "cityName"
                defaultValue = {this.state.cityName}
                onChange={(e) => this.handleChange(e)} >
            </input>
            <div className ="city">{display}</div>
        </div> 
        ) 
        
        
        
        
    
        

   
        
        
    }
}

export default City;