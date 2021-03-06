import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import Picker from './Picker';

class MultiPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      date: props.date || props.defaultDate || [],
    };
  }

  render() {
    const props = this.props;
    const {
      prefixCls, pickerPrefixCls,
      className, rootNativeProps,
      disabled, pickerItemStyle,
      indicatorStyle,
      pure, children,
    } = props;

    const selectedValue = this.getValue();
    const colElements = children.map((col, i) => {
      return (
        <div key={col.key || i} className={`${prefixCls}-item`}>
          <Picker
            itemStyle={pickerItemStyle}
            disabled={disabled}
            pure={pure}
            indicatorStyle={indicatorStyle}
            prefixCls={pickerPrefixCls}
            selectedValue={selectedValue[i]}
            onValueChange={this.onValueChange.bind(this, i)}
            {...col.props}
          />
        </div>
      );
    });

    return (
      <div {...rootNativeProps} className={classnames(className, prefixCls)}>
        {colElements}
      </div>
    );
  }

  getValue() {
    const { children, selectedValue } = this.props;
    if (selectedValue && selectedValue.length) {
      return selectedValue;
    } else {
      if (!children) {
        return [];
      }
      return children.map(c => {
        const cc = c.props.children;
        return cc && cc[0] && cc[0].value;
      });
    }
  }

  onValueChange(i, v) {
    const value = this.getValue().concat();

    value[i] = v;

    this.props.onValueChange(value, i);
  }

}

MultiPicker.defaultProps = {
  prefixCls: 'rmc-multi-picker',
  pickerPrefixCls: 'rmc-picker',
  onValueChange() {
  },
  disabled: false,
};

export default MultiPicker;