import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';

const CTable = ({
  loading,
  dataSource,
  total,
  current,
  pageSize,
  onPageChange,
  onShowSizeChange,
})=>{
  const columns = [{
    title: '任务名称',
    dataIndex: 'task_name',
    key: 'task_name',
    width: '25%',
  },{
    title: '动作',
    dataIndex: 'action_name',
    key: 'action_name',
    width: '15%',
  },{
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width: '45%',
  },{
    title: '创建日期时间',
    dataIndex: 'create_date_time',
    key: 'create_date_time',
    width: '15%',
  }];
  return (
    <div>
      <Table
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
