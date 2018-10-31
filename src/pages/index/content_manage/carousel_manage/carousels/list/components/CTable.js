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
  gotoChildList,
})=>{
  const menuOptions = [
    { key: '1', name: '启用' },
    { key: '2', name: '禁用' },
    { key: '3', name: '查看' },
    { key: '4', name: '编辑' },
    { key: '5', name: '删除' },
    { key: '6', name: '轮播页列表' }
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
      gotoChildList(record.id);
    }
  };

  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '35%',
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: '30%',
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '15%',
  },{
    title: '状态',
    dataIndex: 'status_name',
    key: 'status_name',
    width: '10%',
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
  dataSource: PropTypes.array,
  loading: PropTypes.any,
  total: PropTypes.any,
  pageSize: PropTypes.any,
  current: PropTypes.any,
};

export default CTable;
