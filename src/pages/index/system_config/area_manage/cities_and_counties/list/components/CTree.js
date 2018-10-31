import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Popconfirm } from 'antd';
import DropOption from "../../../../../../../components/DropOption";

const CTree = ({
  loading,
  dataSource,
  onView,
  onEdit,
  onAddChild,
  onDelete,
  onChangeOrderBy,
  onSelect,
}) => {
  const menuOptions = [
    { key: '1', name: '查看' },
    { key: '2', name: '编辑' },
    { key: '3', name: '删除' },
    { key: '4', name: '添加子节点' },
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
      onAddChild(record.id);
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
    width: '45%',
    render: (text, record) => (
      <span><Icon type={record.icon}/><span>&nbsp;&nbsp;&nbsp;{record.name}</span></span>
    ),
  }, {
    title: '区号',
    dataIndex: 'code',
    key: 'code',
    width: '45%',
  }, {
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
    <Table columns={columns} rowSelection={rowSelection} dataSource={dataSource} defaultExpandAllRows={true} pagination={false} loading={loading}/>
  );
};

CTree.propTypes = {
  dataSource: PropTypes.array,
};

export default CTree;
