import React, { Component } from 'react';
import moment from 'moment';

import './style.css';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-text">
          Copyright &copy; {moment().format('YYYY')} - All Rights Reserved.
        </div>
        <div className="footer-text">
          <a href="mailto:marcelwayne87@gmail.com">
            marcelwayne87@gmail.com
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
