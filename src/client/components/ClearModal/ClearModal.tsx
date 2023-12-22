import { Modal } from 'antd';
import React from 'react';
import './ClearModal.css';

interface IClearModal {
  visible: boolean;
  close: () => void;
  classNames?: string;
}

const ClearModal: React.FC<IClearModal> = ({ visible, close, children, classNames }) => {
  return (
    <Modal className={classNames} visible={visible} onCancel={close} footer={null} centered width="auto">
      {children}
    </Modal>
  );
};

export default ClearModal;
