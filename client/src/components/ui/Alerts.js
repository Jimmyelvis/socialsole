import React from 'react';
import { connect } from 'react-redux';
import { createPortal } from "react-dom";


/*
  Alert component for displaying alert after an action 
  is performed, such as logging in, making a comment
*/


  const Alert = (props) => {

    const {alerts} = props;
    
    const showAlerts =  alerts.map((alert, index) => (
      <div 
        key={alert.id} 
        className={'alert alert-' + alert.alertType}
        style={
          {top: `${(index + 1) * 5.5}rem`}
        }
      >
        {alert.msg}
      </div>
    ));

    if (alerts !== null && alerts.length > 0) {
      return createPortal(showAlerts, document.querySelector('#alerts'));
    } else {
      return null;
    }

  }


const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);