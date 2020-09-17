import React from 'react';
import ReactDOM from 'react-dom';

/*
  A reusable modal component, that uses React Portal
*/

const Modal = props => {
  return ReactDOM.createPortal(
    <div className="modalbg"
      style={{
        opacity: props.showlogin || props.showregister ? '1' : '0',
        zIndex: props.showlogin || props.showregister ? '2500' : '0',
        visibility: props.showlogin || props.showregister ? 'visible' : 'hidden',
        transition: "500ms linear"
      }}
      onClick={props.closemodal}
    >
    
      <div className={`${props.modalbody} contentbody`}
        style={{
          opacity: props.showlogin || props.showregister ? '1' : '0',
          transition: "1s 1s linear"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="bgimg">
          <img src={props.image} alt=""/>
        </div>
        
        {props.children}
        
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
