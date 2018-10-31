import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Row, Col, TreeSelect } from 'antd';
import SelectIconModal from '../../../../../../../components/SelectIconModal';
import styles from '../../../../../../../styles/util/FormLayout.less';
import * as util from '../../../../../../../utils/tool/util.js';

const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };

const CForm = ({
  item = [],
  dataSource,
  selectIconModalVisible,
  onSubmit,
  onCancel,
  onSelectIcon,
  onOkSelectIconModal,
  onCancelSelectIconModal,
  onItemClickSelectIconModal,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
  }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      let data = { ...getFieldsValue(), id: item.id };
      data = util.dealData(data);
      onSubmit(data);
    });
  }

  /**
   * 处理树数据源
   * 1、添加根节点
   * 2、移除当前节点，防止出现父节点为【本节点或本节点的子节点】
   */
  function dataSourceHandler() {
    // 1、添加根节点
    let resultValue = [{children: dataSource, key: '0', value: '0', title: '系统菜单'}];
    // 2、移除当前节点，防止出现父节点为【本节点或本节点的子节点】
    console.log("item：" + JSON.stringify(item));
    if (item.key) {
      deleteItem(resultValue, item.key);
    }
    return resultValue;
  }

  function deleteItem(data, key) {
    for(let i = 0; i < data.length; i++) {
      let d = data[i];
      if(d.key === key) {
        data.splice(i,1);
        return;
      }
      if(d.children) {
        deleteItem(d.children, key);
      }
    }
  }

  let treeDataSource = dataSourceHandler();

  const treeSelectProps = {
    showSearch:true,
    dropdownStyle:{ maxHeight: 400, overflow: 'auto' },
    placeholder:'请选择上级节点',
    treeData:treeDataSource,
    multiple: false,
    treeCheckable: false,
    allowClear:true,
    treeDefaultExpandAll:true,
  };
  const selectIconModalProps = {
    visible: selectIconModalVisible,
    onOk: onOkSelectIconModal,
    onCancel: onCancelSelectIconModal,
    onItemClick: onItemClickSelectIconModal,
  };
  // 解决 Form.create initialValue 的问题
  // 每次创建一个全新的组件, 而不做diff
  const SelectIconModalGen = () =>
    <SelectIconModal {...selectIconModalProps} />;
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Form.Item label="上级：" {...formItemLayout}>
          {getFieldDecorator('parent_id', {
            initialValue: item.parent_id + '',
            rules: [{ required: true, message: '请选择上级节点' },],
          })(<TreeSelect {...treeSelectProps}/>)}
        </Form.Item>
        <Form.Item label="名称：" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [{ required: true, message: '请输入名称' },],
          })(<Input type="text" placeholder="请输入名称" maxLength="30"/>)}
        </Form.Item>
        <Form.Item label="链接：" {...formItemLayout}>
          {getFieldDecorator('link', {
            initialValue: item.link,
            rules: [{ required: true, message: '请输入链接' },],
          })(<Input type="textarea" placeholder="请输入链接" maxLength="100"/>)}
        </Form.Item>
        <Form.Item label="图标：" {...formItemLayout}>
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('icon', {
                initialValue: item.icon,
                rules: [{ required: false, message: '请选择图标' }],
              })(<Input prefix={item.icon ? <Icon type={item.icon} /> : ''} type="text" placeholder='请选择图标' maxLength="30" readOnly={true} onClick={onSelectIcon} />)}
            </Col>
            <Col span={2}>
              <Button icon="search"  onClick={onSelectIcon} />
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="备注：" {...formItemLayout}>
          {getFieldDecorator('remark', {
            initialValue: item.remark,
            rules: [{ required: false, message: '请输入备注' },],
          })(<Input type="textarea" placeholder="请输入备注" maxLength="50"/>)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>保存</Button>
          <Button onClick={onCancel}>取消</Button>
        </Form.Item>
      </Form>
      <SelectIconModalGen />
    </div>
  );
};

CForm.propTypes = {
  visible: PropTypes.any,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CForm);
