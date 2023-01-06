import { memo, Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import styles from './Default.module.css';
function DefaultComponent(props) {
  return <Fragment></Fragment>;
}
export default memo(DefaultComponent);
DefaultComponent.defaultProps = {};
DefaultComponent.propTypes = {};
