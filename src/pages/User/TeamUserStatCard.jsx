import React from 'react';
import PropTypes from 'prop-types';
import { Body02 } from '../../styles/FontStyle/Typography';
import '../../styles/User/TeamUserStatCard.css';

const TeamUserStatCard = ({ teamDatas }) => {
  return (
    <section className="team-user-stat-container">
      <ul className="stat-list">
        {teamDatas.map((data, index) => (
          <li key={index} className="stat-item">
            <Body02 fontWeight="semiBold" className="name">
              {data.name}
            </Body02>
            <Body02 fontWeight="semiBold" className="count">
              {data.totalCount}
            </Body02>
          </li>
        ))}
      </ul>
    </section>
  );
};

// default Props
TeamUserStatCard.defaultProps = {
  teamDatas: [
    {
      name: '전체',
      totalCount: 0,
    },
  ],
};
// PropTypes
TeamUserStatCard.propTypes = {
  teamDatas: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default TeamUserStatCard;
