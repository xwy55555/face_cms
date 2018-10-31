import React from 'react';
import PropTypes from 'prop-types';
import { Tree, Popconfirm, Form, Button, Input, } from 'antd';
import styles from '../../../../../../../styles/util/FormLayout.less';

const FormItem = Form.Item;
const formItemLayout = { labelCol: { span: 6, }, wrapperCol: { span: 14, }, };
const Search = Input.Search;
const TreeNode = Tree.TreeNode;

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: node.name });
    if (node.children) {
      generateList(node.children, node.key);
    }
  }
};

const dataList = [];

const CAuth = ({
  item = [],
  checkedKeys,
  expandedKeys,
  autoExpandParent,
  searchValue,
  dataSource,
  onSave,
  onCancel,
  onCheck,
  onExpand,
  onChange,
})=>{
  function onSelectHandler(info) {
    console.log('selected', info);
  }
  function onCheckHandler(info) {
    console.log('onCheck', info);
    onCheck(info);
  }
  function onChangeSearch(e) {
    const value = e.target.value;
    const expandedKeys = dataList.map((item) => {
      if (item.title.indexOf(value) > -1) {
        return getParentKey(item.key, dataSource);
      }
      return null;
    }).filter((item, i, self) => item && self.indexOf(item) === i);
    onChange(expandedKeys, value, true);
  }
  const loop = data => data.map((item) => {
    searchValue = searchValue === null || searchValue === undefined ? "" : searchValue;
    const index = item.name.search(searchValue);
    const beforeStr = item.name.substr(0, index);
    const afterStr = item.name.substr(index + searchValue.length);
    let remarkMessage = "";
    if (item.key > 0) {
      remarkMessage = ((item.remark === null || item.remark === undefined || item.remark === "") ? "" : "（" + item.remark + "）");
    }
    const title = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{searchValue}</span>
        {afterStr} {remarkMessage}
        </span>
    ) : <span>{item.name}{remarkMessage}</span>;

    if (item.children) {
      return (
        <TreeNode key={item.key} title={title}>
          {loop(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode key={item.key} title={title} />;
  });
  const treeNodes = loop(dataSource);
  console.log("checkedKeys: " + checkedKeys);
  generateList(dataSource);
  return (
    <div className={styles.formLayout}>
      <Form layout="horizontal">
        <FormItem label="当前用户：" {...formItemLayout}>
          <label>{item.name}</label>
        </FormItem>
        <FormItem label="选择角色：" {...formItemLayout}>
          <div className={styles.divTree}>
            <Search style={{ width: 300 }} placeholder="请输入角色名称" value={searchValue === null || searchValue === undefined ? "" : searchValue} onChange={onChangeSearch} />
            <Tree checkable checkedKeys={checkedKeys}
                  onSelect={onSelectHandler} onCheck={onCheckHandler}
                  onExpand={onExpand} expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}>
              { treeNodes }
            </Tree>
          </div>
        </FormItem>
        <FormItem wrapperCol={{ span: 18, offset: 6 }}>
          <Button onClick={onSave} type="primary" style={{ marginRight: 8 }}>保存</Button>
          <Button onClick={onCancel}>取消</Button>
        </FormItem>
      </Form>
    </div>
  );
};

CAuth.prototype = {
  checkedKeys: PropTypes.array,
  dataSource: PropTypes.array,
};

export default CAuth;
