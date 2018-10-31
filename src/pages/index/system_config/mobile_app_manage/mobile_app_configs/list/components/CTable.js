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
  onSelect,
})=>{
  const menuOptions = [
    { key: '1', name: '启用' },
    { key: '2', name: '禁用' },
    { key: '3', name: '查看' },
    { key: '4', name: '编辑' },
    { key: '5', name: '删除' }
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
    }
  };


  const columns = [{
    title: '应用',
    dataIndex: 'mobile_app_name',
    key: 'mobile_app_name',
    width: '10%',
  },{
    title: '版本',
    dataIndex: 'version',
    key: 'version',
    width: '10%',
  },{
    title: '强制更新',
    dataIndex: 'forced_update_flag',
    key: 'forced_update_flag',
    width: '8%',
    render: (text, record) => (
      <span>
        <span style={{ 'display': (record.forced_update_flag === 'true' ?  'inline' : 'none'), 'color': 'green', fontSize: 20 }}><Icon type="check-square-o" /></span>
        <span style={{ 'display': (record.forced_update_flag === 'true' ?  'none' : 'inline'), 'color': 'red', fontSize: 20  }}><Icon type="close-square-o" /></span>
      </span>
    ),
  },{
    title: '下载链接',
    dataIndex: 'download_url',
    key: 'download_url',
    width: '25%',
  },{
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    width: '8%',
    render: (text, record) => (
      <span>
        <span style={{ 'display': (record.type === 'iOS' ?  'inline' : 'none'), 'color': 'green', fontSize: 20 }}><Icon type="apple" /></span>
        <span style={{ 'display': (record.type === 'Android' ?  'inline' : 'none'), 'color': 'green', fontSize: 20  }}><Icon type="android" /></span>
      </span>
    ),
  },{
    title: '文件大小',
    dataIndex: 'file_size',
    key: 'file_size',
    width: '10%',
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '14%',
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
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
