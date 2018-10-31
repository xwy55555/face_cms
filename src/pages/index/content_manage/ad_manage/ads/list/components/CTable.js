import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Pagination, Icon } from 'antd';
import DropOption from '../../../../../../../components/DropOption/DropOption';

const { confirm } = Modal;

const CTable = ({
  loading,
  dataSource,
  total,
  current,
  pageSize,
  onPageChange,
  onShowSizeChange,
  onEnabled,
  onDisabled,
  onView,
  onEdit,
  onDelete,
  onChangeOrderBy,
  onSelect,
})=>{
  function imageHandler(record) {
    if (record && record.image_url !== null && record.image_url !== undefined) {
      return <img style={{height: 50, width: 50}} src={record.image_url}/>;
    } else {
      return "";
    }
  }
  const menuOptions = [
    { key: '1', name: '启用' },
    { key: '2', name: '禁用' },
    { key: '3', name: '查看' },
    { key: '4', name: '编辑' },
    { key: '5', name: '删除' },
    { key: '6', name: '上移' },
    { key: '7', name: '下移' }
  ];
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEnabled(record.id);
    } else if (e.key === '2') {
      onDisabled(record.id);
    } else if (e.key === '3') {
      onView(record.id);
    } else if (e.key === '4') {
      onEdit(record.id);
    } else if (e.key === '5') {
      confirm({
        title: '确定要删除这条记录吗?',
        onOk () {
          onDelete(record.id);
        },
      })
    } else if (e.key === '6') {
      onChangeOrderBy(record, 'up');
    } else if (e.key === '7') {
      onChangeOrderBy(record, 'down');
    }
  };
  const columns = [{
    title: '广告图',
    dataIndex: 'image_path_name',
    key: 'image_path_name',
    width: '5%',
    render: (text, record) => (
      <div>
        {imageHandler(record)}
      </div>
    ),
  },{
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    width: '15%',
  },{
    title: '目标链接',
    dataIndex: 'target_url',
    key: 'target_url',
    width: '20%',
  },{
    title: '适用终端',
    dataIndex: 'client_types',
    key: 'client_types',
    width: '15%',
  },{
    title: '开始日期时间',
    dataIndex: 'begin_date_time',
    key: 'begin_date_time',
    width: '15%',
  },{
    title: '截止日期时间',
    dataIndex: 'end_date_time',
    key: 'end_date_time',
    width: '15%',
  },{
    title: '状态',
    dataIndex: 'status_name',
    key: 'status_name',
    width: '5%',
    render: (text, record) => (
      <span>
        <span style={{ 'display': (record.status === 'disabled' ?  'inline' : 'none'), 'color': 'red', fontSize: 20 }}><Icon type="close-circle" /></span>
        <span style={{ 'display': (record.status === 'disabled' ?  'none' : 'inline'), 'color': 'green', fontSize: 20 }}><Icon type="check-circle" /></span>
      </span>
    ),
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    render: (text, record) => {
      return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={menuOptions} />
    },
  }];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      let selectedKeys = [];
      for(let key in selectedRows) {
        selectedKeys.push(selectedRows[key].id);
      }
      console.log(`selectedKeys:  ${selectedKeys}`);
      onSelect(selectedKeys);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        showSizeChanger
        total={total}
        pageSize = {pageSize}
        current={current}
        onChange={onPageChange}
        showTotal={total => `共 ${total} 条`}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  );
};

CTable.prototype = {
  onPageChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  onEnabled: PropTypes.func,
  onDisabled: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
