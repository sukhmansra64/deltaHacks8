import React from 'react';
import {connect} from 'react-redux'
import {setAlert} from "../actions/alert";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import neuralnet from "../style/media/neuralnetreal.jpg"
import {Link} from 'react-router-dom'

const Landing = () => {

    return (
        <div>
            <div className='main'>
                <h1>LectureLogs</h1>
                <p id = "p2">Automated lecture cataloguing using AssemblyAI</p><br/>
                <Link to="/tran" className='rounded-button'>START TRANSCRIBING</Link>
                
            </div>

            <img src={neuralnet} class='media'></img>

            <div id="names">
                <h2 id = "differenth2">CREATED BY</h2>
                <div id="p2">
                    <p>Sukhman / Taha / Carter / Adrian</p>
                </div> 
            </div>
        </div>
    );
};


// <div class='main'>
//     <h1>LectureLogs</h1>
//     <p>Automated lecture cataloguing using AssemblyAI</p>
//     <a href='transcribe.html' class='rounded-button'>START TRANSCRIBING</a>
// </div>

// <img src='media/neuralnet.gif' class='media'>

Landing.propTypes={
    setAlert: PropTypes.func.isRequired,
}

export default connect(null,{setAlert})(Landing);
