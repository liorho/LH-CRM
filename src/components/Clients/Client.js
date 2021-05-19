import React from 'react';
import Moment from 'react-moment';

const Client = ({client, openClientDetailsPopUp}) => (
  <tr className='clientDetails' onClick={() => openClientDetailsPopUp(client)}>
    <th>{client.name.split(' ')[0]}</th>
    <th>{client.name.split(' ')[1]}</th>
    <th>{client.country}</th>
    <th>{client.email}</th>
    <th>{client.owner}</th>
    <th>{client.sold ? 'YES' : 'NO'}</th>
    <th>
      <Moment format='DD/MM/YYYY'>{client.firstContact}</Moment>
    </th>
    <th>{client.emailType ? client.emailType : '-'}</th>
  </tr>
);

export default Client;
