import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CTable from './components/CTable';

function RList({ dispatch, userAnalysisList }) {
  const { sexData, ageData } = userAnalysisList;

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
function mapStateToProps({ userAnalysisList }) {
  return { userAnalysisList };
}

// 建立数据关联关系
export default connect(mapStateToProps)(RList);
