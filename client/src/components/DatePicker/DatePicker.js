import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './style.css';

class Datepicker extends Component {
  render() {
    const {
      dateFormat,
      disabledDays,
      selected,
      onChange,
    } = this.props;

    const filterDate = (d) => disabledDays.indexOf(moment(d).format('ddd')) === -1
      && (moment(d).isBefore(moment().startOf('day')));

    return (
      <DatePicker
        className="form-control"
        dateFormat={dateFormat}
        selected={selected}
        filterDate={filterDate}
        autoComplete="off"
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
      />
    );
  }
}

Datepicker.propTypes = {
  dateFormat: PropTypes.string,
  disabledDays: PropTypes.array,
};

Datepicker.defaultProps = {
  dateFormat: 'Do MMMM, YYYY',
  disabledDays: [],
};

export default Datepicker;
