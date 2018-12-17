import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import moment from 'moment';
import Modal from 'react-bootstrap/lib/Modal';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import { SketchPicker } from 'react-color';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import { confirm } from '../../utils/modals';
import Datepicker from '../../components/DatePicker';
import ColorPicker from '../../components/ColorPicker';
import Constant from './Constants';

import './style.css';

class LayoutSettingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: props.show,
      columnOrder: localStorage.getItem('columnOrder') ? JSON.parse(localStorage.getItem('columnOrder')) : [0, 1, 2],
      orderLabel: localStorage.getItem('orderLabel') ? JSON.parse(localStorage.getItem('orderLabel')) : [
        'Make School',
        'Hacker News',
        'Y Combinator',
      ],
      timeRange: {
        from: localStorage.getItem('timeRange') ? moment(JSON.parse(localStorage.getItem('timeRange')).from) : moment('2018-01-01 00:00'),
        to: localStorage.getItem('timeRange') ? moment(JSON.parse(localStorage.getItem('timeRange')).to) : moment(),
      },
      makeSchoolTweetNumber: localStorage.getItem('makeSchoolTweetNumber') || 30,
      hackerNewsTweetNumber: localStorage.getItem('hackerNewsTweetNumber') || 30,
      yCombinatorTweetNumber: localStorage.getItem('yCombinatorTweetNumber') || 30,
      background: {
        r: localStorage.getItem('backColor') ? JSON.parse(localStorage.getItem('backColor')).r : '252',
        g: localStorage.getItem('backColor') ? JSON.parse(localStorage.getItem('backColor')).g : '252',
        b: localStorage.getItem('backColor') ? JSON.parse(localStorage.getItem('backColor')).b : '252',
        a: localStorage.getItem('backColor') ? JSON.parse(localStorage.getItem('backColor')).a : '1',
      },
    }
  }

  onSave = () => {
    this.saveLayoutSetting();
    this.props.settingApply();
    this.handleHide();
  }

  onReset = () => {
    confirm({
      title: 'Reset Layout Setting',
      message: 'Are you sure you want to reset all setting?',
      okLabel: 'Yes',
      cancelLabel: 'No',
    }).then(() => {
      this.resetLayoutSetting();
    }).catch(() => { });
  }

  onCancel = () => {
    this.props.settingApply();
    this.handleHide();
  }

  handleColumnOrder = (evt) => {
    const { columnOrder, orderLabel } = this.state;

    const val = evt.target.value;
    if (val > 0) {
      let temp = columnOrder[val];
      columnOrder[val] = columnOrder[val - 1]
      columnOrder[val - 1] = temp;
      temp = orderLabel[val];
      orderLabel[val] = orderLabel[val - 1]
      orderLabel[val - 1] = temp;

      this.setState({ columnOrder, orderLabel, });
    }
  }

  handleTimeRange = (field) => (date) => {
    this.setState(prevState => ({
      timeRange: {
        ...prevState.timeRange,
        [field]: date,
      }
    }))
  }

  handleTweetNumber = (field) => (evt) => {
    let showTweetNumber = evt.target.value;
    if (showTweetNumber > 30) {
      showTweetNumber = 30;
    }
    if (showTweetNumber < 1) {
      showTweetNumber = 1;
    }
    this.setState({ [field]: showTweetNumber });
  }

  handleSliderChange = (field) => (value) => {
    this.setState({ [field]: value });
  }

  handleChangeColor = (color) => {
    this.setState({ background: color.rgb })
  }

  handleHide = () => {
    this.setState({ show: false });
    this.props.onModalHide();
  }

  saveLayoutSetting = () => {
    const {
      columnOrder,
      orderLabel,
      timeRange,
      makeSchoolTweetNumber,
      hackerNewsTweetNumber,
      yCombinatorTweetNumber,
      background,
    } = this.state

    localStorage.setItem(Constant.localStorageKey[0], JSON.stringify(columnOrder));
    localStorage.setItem(Constant.localStorageKey[1], JSON.stringify(orderLabel));
    localStorage.setItem(Constant.localStorageKey[2], JSON.stringify(timeRange));
    localStorage.setItem(Constant.localStorageKey[3], makeSchoolTweetNumber);
    localStorage.setItem(Constant.localStorageKey[4], hackerNewsTweetNumber);
    localStorage.setItem(Constant.localStorageKey[5], yCombinatorTweetNumber);
    localStorage.setItem(Constant.localStorageKey[6], JSON.stringify(background));
  }

  resetLayoutSetting = () => {
    Constant.localStorageKey.map((item) => (
      localStorage.removeItem(item)
    ));
    this.resetSetting();
  }

  resetSetting = () => {
    this.setState({
      columnOrder: [0, 1, 2],
      orderLabel: [
        'Make School',
        'Hacker News',
        'Y Combinator',
      ],
      timeRange: {
        from: moment('2018-01-01 00:00'),
        to: moment(),
      },
      makeSchoolTweetNumber: 30,
      hackerNewsTweetNumber: 30,
      yCombinatorTweetNumber: 30,
      background: {
        r: '252',
        g: '252',
        b: '252',
        a: '1',
      },
    })
  }

  // Column Order Setting Section
  renderColumnOrder() {
    return (
      <div className={cx('setting-modal__columnorder', 'setting-modal__block')}>
        <div className={cx('setting-modal__columnorder-label', 'setting-modal__label')}>
          Order of the columns
        </div>
        <ul className="setting-modal__columnorder-panel">
          {this.state.orderLabel.map((item, index) => (
            <li
              key={`${item}`}
              className="setting-modal__columnorder-item"
              value={index}
              onClick={this.handleColumnOrder}
            >
              {`${index + 1}. ${item} `}
              {index > 0 &&
                <i className={cx('fa', 'fa-arrow-up', 'setting-modal__columnorder-item__icon')} />
              }
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Time Range Setting Section
  renderTimeRange() {
    return (
      <Row className={cx('setting-modal__daterange', 'setting-modal__block')}>
        <div className={cx('setting-modal__daterange-label', 'setting-modal__label')}>
          Time range of the tweets shown
        </div>
        <div className="setting-modal__daterange-from">
          <Col md={1} sm={1} className="setting-modal__daterange-text">
            From:
          </Col>
          <Col md={10} sm={10} className="setting-modal__daterange-input">
            <Datepicker
              dateFormat="Do MMMM, YYYY HH:MM"
              selected={this.state.timeRange.from}
              onChange={this.handleTimeRange('from')}
            />
          </Col>
        </div>
        <div className="setting-modal__daterange-to">
          <Col md={1} sm={1} className="setting-modal__daterange-text">
            To:
          </Col>
          <Col md={10} sm={10} className="setting-modal__daterange-input">
            <Datepicker
              dateFormat="Do MMMM, YYYY HH:MM"
              selected={this.state.timeRange.to}
              onChange={this.handleTimeRange('to')}
              startDate={this.state.timeRange.from}
            />
          </Col>
        </div>
      </Row>
    )
  }

  // Tweet Number Setting Section
  renderTweetNumber() {
    const {
      makeSchoolTweetNumber,
      hackerNewsTweetNumber,
      yCombinatorTweetNumber,
    } = this.state;
    const tweetNumbers = [
      parseInt(makeSchoolTweetNumber, 10),
      parseInt(hackerNewsTweetNumber, 10),
      parseInt(yCombinatorTweetNumber, 10),
    ];
    return (
      <div className={cx('setting-modal__tweetnumber', 'setting-modal__block')}>
        <div className={cx('setting-modal__tweetnumber-label', 'setting-modal__label')}>
          Number of tweets shown in each column:
        </div>
        <div className="setting-modal__tweetnumber-panel">
          {Constant.tweetNumber.map((item, index) => (
            <div key={`item_${index}`} className="setting-modal__tweetnumber-item">
              <span>{item.label}</span>
              <Slider
                className="setting-modal__tweetnumber-slider"
                min={1}
                max={30}
                step={1}
                value={tweetNumbers[index]}
                handleLabel=""
                tooltip={false}
                onChange={this.handleSliderChange(item.value)}
              />
              <input
                className="setting-modal__tweetnumber-input"
                type="number"
                min="1"
                max="30"
                value={tweetNumbers[index]}
                onChange={this.handleTweetNumber(item.value)}
              />
            </div>
          ))}
          
        </div>
      </div>
    )
  }

  // Background Color Setting Section
  renderPalette() {
    const { background } = this.state;
    return (
      <div className={cx('setting-modal__palette', 'setting-modal__block')}>
        <div className={cx('setting-modal__palette-label', 'setting-modal__label')}>
          Palette of the tweet item
        </div>
        <div className="setting-modal__palette-picker">
          <ColorPicker color={background}>
            <SketchPicker color={background} onChange={this.handleChangeColor} />
          </ColorPicker>
        </div>
      </div>
    )
  }

  render() {
    const {
      show,
    } = this.state;
    return (
      <div>
        <Modal
          show={show}
          onHide={this.handleHide}
          dialogClassName="setting-modal"
        >
          <Modal.Header closeButton>
            <h4>Setting Layout</h4>
          </Modal.Header>
            <Modal.Body>
              <div className="setting-modal__content">
                {this.renderColumnOrder()}
                {this.renderTimeRange()}
                {this.renderTweetNumber()}
                {this.renderPalette()}
              </div>
            </Modal.Body>
            <Modal.Footer className="setting-modal__footer">
              <div className="setting-modal__footer-reset">
                <Button className="setting-modal__button" onClick={this.onReset} bsSize="sm" bsStyle="primary">
                  Reset
                </Button>
              </div>
              <div className="setting-modal__footer-save">
                <Button className="setting-modal__button" onClick={this.onSave} bsSize="sm" bsStyle="primary">
                  Save
                </Button>
                <Button className="setting-modal__button" onClick={this.onCancel} bsSize="sm" bsStyle="primary">
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

LayoutSettingModal.propTypes = {
  show: PropTypes.bool,
  onModalHide: PropTypes.func,
};

LayoutSettingModal.defaultProps = {
  show: false,
  onModalHide: () => undefined,
};

export default LayoutSettingModal;
