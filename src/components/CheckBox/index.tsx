import { Checkbox as AntCheckbox } from 'antd';
import React from 'react';
import styles from './index.module.scss';

const CheckBox = ({...props}) =>  {
    return (
        <AntCheckbox className={styles.checkbox} {...props}  />
    )
}

export default CheckBox
