import React from 'react';
import Avatar from '../../../../components/Avatar';

import './style.css';

function getTextFromContent(content) {
  const text = content.split('https');
  return text[0];
}

function getUrlsFromContent(content) {
  const urls = content.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g);
  if (!urls) return [];
  return urls;
}

function convertDataFormat(isoDate) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = new Date(isoDate);
  const day = d.getDate();
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  const wellFormattedDate = `${day} ${month} ${year}`;

  return wellFormattedDate;
}

const TweetItem = ({
  tweet,
}) => {
  const color = JSON.parse(localStorage.getItem('backColor'));
  const styleItem = color ? `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` : '';
  return (
    <div className="tweet-item" style={{ background: styleItem }}>
      <div className="tweet-item__left">
        <Avatar src={tweet.user.profile_image_url_https} />
      </div>
      <div className="tweet-item__right">
        <div className="tweet-item__top">
          <div className="tweet-item__name">
            <div className="tweet-item__name-username">{tweet.user.name}</div>
            <div className="tweet-item__name-nickname">{`@${tweet.user.screen_name}`}</div>
          </div>
          <div className="tweet-item__name-timestamp">{convertDataFormat(tweet.created_at)}</div>
        </div>
        <div className="tweet-item__content">
          {getTextFromContent(tweet.text)}
          {getUrlsFromContent(tweet.text).map((item, index) => (
            <a key={`item_${index}`} href={`${item}`} target="_blank">{item} &nbsp;</a>
          ))}
        </div>
        <div className="tweet-item__link">
        </div>
      </div>
    </div>
  );
};

export default TweetItem;
