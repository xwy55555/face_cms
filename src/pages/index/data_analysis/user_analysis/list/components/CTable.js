import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { ChartCard, Pie, Bar } from 'ant-design-pro/lib/Charts';
import 'ant-design-pro/dist/ant-design-pro.css';

const CTable = ({
  sexData,
  ageData,
})=>{
  return (
    <div>
      <Row>
        <Col span={16}>
          <ChartCard
            title="用户性别分布"
            contentHeight={260}>
            <Pie
              hasLegend
              title="用户数"
              subTitle="用户数"
              total={sexData.reduce((pre, now) => now.y + pre, 0)}
              data={sexData}
              height={260}/>
          </ChartCard>
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col span={16}>
          <ChartCard
            title="用户年龄分布"
            contentHeight={260}>
            <Bar
              title=""
              height={260}
              data={ageData}/>
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
};

CTable.prototype = {
  sexData: PropTypes.array,
  ageData: PropTypes.array,
};

export default CTable;
