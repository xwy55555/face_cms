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
            title="会员性别分布"
            contentHeight={260}>
            <Pie
              hasLegend
              title="会员数"
              subTitle="会员数"
              total={sexData.reduce((pre, now) => now.y + pre, 0)}
              data={sexData}
              height={260}/>
          </ChartCard>
        </Col>
      </Row>
      <Row style={{ marginTop: 24 }}>
        <Col span={16}>
          <ChartCard
            title="会员年龄分布"
            contentHeight={260}>
            <Bar
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
