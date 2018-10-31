import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CTable from './components/CTable';

function RList({ dispatch, memberAnalysisList }) {
  const { sexData, ageData } = memberAnalysisList;

  const tableProps = {
    sexData,
    ageData,
  };
  return (
    <CTable {...tableProps}/>
  );
}

RList.propTypes = {
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ memberAnalysisList }) {
  return { memberAnalysisList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
