import React from 'react';
import { connect } from 'react-redux';

/*
  Alert component for displaying alert after an action 
  is performed, such as logging in, making a comment
*/


  const Alert = (props) => {

    const {alerts} = props;

    if (alerts !== null && alerts.length > 0) {
      return alerts.map(alert => (
        <div key={alert.id} className={'alert alert-' + alert.alertType}>
          {alert.msg}
        </div>
      ));
    } else {
      return null;
    }

  }


const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);