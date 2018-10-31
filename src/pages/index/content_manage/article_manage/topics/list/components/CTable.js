import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal, Pagination } from 'antd';
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
  onView,
  onEdit,
  onDelete,
  gotoChildList,
  onChangeOrderBy,
  onSelect,
})=>{
  const menuOptions = [
    { key: '1', name: '查看' },
    { key: '2', name: '编辑' },
    { key: '3', name: '删除' },
    { key: '4', name: '文章列表' },
    { key: '5', name: '上移' },
    { key: '6', name: '下移' }
  ];

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onView(record.id);
    } else if (e.key === '2') {
      onEdit(record.id);
    } else if (e.key === '3') {
      confirm({
        title: '确定要删除选中的节点及其子节点吗?',
        onOk () {
          onDelete(record.id);
        },
      })
    } else if (e.key === '4') {
      gotoChildList(record.id);
    } else if (e.key === '5') {
      onChangeOrderBy(record, 'up');
    } else if (e.key === '6') {
      onChangeOrderBy(record, 'down');
    }
  };

  const columns = [{
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    width: '25%',
  },{
    title: '标识',
    dataIndex: 'code',
    key: 'code',
    width: '25%',
  },{
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: '25%',
  },{
    title: '最后更新时间',
    dataIndex: 'last_update_date_time',
    key: 'last_update_date_time',
    width: '15%',
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
