import { InboxOutlined } from '@ant-design/icons';
import { Col, Row, Upload } from 'antd';
import React from 'react';
import './GiftModalEdit.styl';

const { Dragger } = Upload;

const GiftModalEdit = () => {
  return (
    <Row className="gift-modal-edit__wrapper">
      <Col span={16}>
        <Dragger className="dragger">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Кликните или перетащите файлы для загрузки</p>
          <p className="ant-upload-hint">Поддерживаются файлы формата .jpg .jpeg .png</p>
        </Dragger>
      </Col>
      <Col span={8}>right</Col>
    </Row>
  );
};

export default GiftModalEdit;
