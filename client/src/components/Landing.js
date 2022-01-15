import React from 'react';
import {connect} from 'react-redux'
import {setAlert} from "../actions/alert";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

const Landing = ({setAlert}) => {
    const onClick = (e) =>{
        e.preventDefault();
        setAlert('Hello world','danger');
    }
    return (
        <>
            <div>
                This is the dashboard
            </div>
            <Button onClick={(e)=>onClick(e)}>hello world button</Button>
        </>
    );
};

Landing.propTypes={
    setAlert: PropTypes.func.isRequired,
}

export default connect(null,{setAlert})(Landing);
