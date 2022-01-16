import React from 'react';
import {connect} from 'react-redux'
import {setAlert} from "../actions/alert";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

const Landing = () => {

    return (
        <div className='main'>
            <h1>PROJECT NAME</h1>
            <p>description<br/><br/><br/><br/><br/><br/><br/>description</p>
            <h2>CREATED BY</h2>
            <p>Sukhman / Taha / Carter / Adrian</p>
        </div>
    );
};

Landing.propTypes={
    setAlert: PropTypes.func.isRequired,
}

export default connect(null,{setAlert})(Landing);
