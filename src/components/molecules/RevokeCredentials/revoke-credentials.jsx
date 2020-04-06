import React, { useEffect } from 'react';
import './_style.scss';
import { Menu, Dropdown, Modal } from 'antd';
import { useState } from 'react';
import { useApi } from '../../../services/useApi';
import api from '../../../services/api-calls/all';
import { DownOutlined } from '@ant-design/icons';

const { revokeCredentials } = api();

const RevokeCredentials = () => {
  const [visible, setVisible] = useState(false);
  const [selectedRevokeType, setSelectedRevokeType] = useState(null);

  const credentialCall = useApi();

  const handleOk = e => {
    setVisible(false);
    credentialCall(revokeCredentials, { id: selectedRevokeType }, onSuccess, onError);
  };

  const onSuccess = () => {
    setVisible(false);
  };

  const onError = () => {};

  const handleCancel = e => {
    console.log(e);
    setVisible(false);
  };

  const onItemClick = id => {
    setSelectedRevokeType(id);
    setVisible(true);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => onItemClick('mora')}>Mora</Menu.Item>
      <Menu.Item onClick={() => onItemClick('creditEnd')}>Fin del credito</Menu.Item>
      <Menu.Item onClick={() => onItemClick('death')}>Fallecimiento</Menu.Item>
      <Menu.Item onClick={() => onItemClick('leave')}>Desvinculación</Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} className="RevokeCredentials">
        <a className="ant-dropdown-link" href="" onClick={e => e.preventDefault()}>
          Revocar credencial <DownOutlined />
        </a>
      </Dropdown>
      <Modal
        visible={visible}
        cancelText={'Cancelar'}
        okText="Confirmar"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default RevokeCredentials;
