import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import LayoutSettingModal from '../LayoutSettingModal';
import PageLoading from '../../components/PageLoading';
import BacktoTop from '../../components/BacktoTop';
import TweetItem from './components/TweetItem';
import MarcelWayneLogo from '../../images/marcelwayne.png';

import './style.css';

class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      makeSchoolTweets: [],
      newsYcombinatorTweets: [],
      ycombinatorTweets: [],
      modalShow: false,
    };
  }

  componentDidMount() {
    this.getAllTweets();
  }

  getTweetsApi = async (name, number) => {
    let count = number;
    if (!number) {
      count = 30;
    }

    // eslint-disable-next-line
    const response = await fetch(`1.1/statuses/user_timeline.json\?include_rts\=true\&count\=${count}\&screen_name\=${name}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  settingApply = () => {
    this.getAllTweets();
  }

  getAllTweets() {
    this.getTweetsApi('makeschool', localStorage.getItem('makeSchoolTweetNumber'))
      .then((res) => this.setState({ makeSchoolTweets: res }))
      .catch((err) => <div>{err}</div>);

    this.getTweetsApi('newsycombinator', localStorage.getItem('hackerNewsTweetNumber'))
      .then((res) => this.setState({ newsYcombinatorTweets: res }))
      .catch((err) => <div>{err}</div>);

    this.getTweetsApi('ycombinator', localStorage.getItem('yCombinatorTweetNumber'))
      .then((res) => this.setState({ ycombinatorTweets: res }))
      .catch((err) => <div>{err}</div>);
  }

  handleModalHide = () => {
    this.setState({ modalShow: !this.state.modalShow });
  }

  checkDate(itemDateStr) {
    if (!localStorage.getItem('timeRange')) return true;
    const itemDate = new Date(itemDateStr).getTime();
    const startDate = new Date(JSON.parse(localStorage.getItem('timeRange')).from).getTime();
    const endDate = new Date(JSON.parse(localStorage.getItem('timeRange')).to).getTime();
    if (itemDate < startDate || itemDate > endDate) {
      return null;
    }
    return true;
  }

  render() {
    const {
      makeSchoolTweets,
      newsYcombinatorTweets,
      ycombinatorTweets,
      modalShow,
    } = this.state;

    const allTweets = [
      makeSchoolTweets,
      newsYcombinatorTweets,
      ycombinatorTweets,
    ];

    if (!makeSchoolTweets.length || !newsYcombinatorTweets.length || !ycombinatorTweets.length) {
      return <PageLoading />;
    }

    const allTweetsIndex = localStorage.getItem('columnOrder') ? JSON.parse(localStorage.getItem('columnOrder')) : null;

    return (
      <React.Fragment>
        <div className="homepage-top">
          <img className="homepage-logo" src={MarcelWayneLogo} alt="MW" />
          <Button className="homepage-setting" bsStyle="primary" bsSize="sm" onClick={this.handleModalHide}>
            <i className="fa fa-cog homepage-setting__icon" />
            <label>Setting Layout</label>
          </Button>
        </div>
        <div className="homepage">
          <Row>
            {allTweetsIndex ?
              allTweetsIndex.map((idx) => (
                <Col key={`item_${idx}`} md={4}>
                  {allTweets[idx].map((item) => (
                    this.checkDate(item.created_at) &&
                    <TweetItem key={item.id} tweet={item} />
                  ))}
                </Col>
              )) :
              allTweets.map((tweet, index) => (
                <Col key={`item_${index}`} md={4}>
                  {tweet.map((item) => (
                    this.checkDate(item.created_at) &&
                    <TweetItem key={item.id} tweet={item} />
                  ))}
                </Col>
              ))
            }
          </Row>
          <BacktoTop />

          {modalShow &&
            <LayoutSettingModal
              show={modalShow}
              onModalHide={this.handleModalHide}
              settingApply={this.settingApply}
            />
          }
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;
