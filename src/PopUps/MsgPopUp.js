import React from 'react';

const MsgPopUp = ({msg}) => (
  <div className={`${msg}-pop-up`}>
    <div>{msg === 'success' ? 'UPDATE SUCCESSFUL' : 'SOME DETAILS ARE MISSING'}</div>
  </div>
);

export default MsgPopUp
