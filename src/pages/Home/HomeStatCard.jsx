import React from 'react';
import '../../styles/HomeStatCard.css';
import PropTypes from 'prop-types';
import UpArrow from '../../assets/img/upArrow.svg';
import Arrow from '../../assets/img/arrow.svg';
import { Body02, Body01, Headline01 } from '../../styles/FontStyle/Typography';
import { useNavigate } from 'react-router-dom';


const HomeStatCard = ({ item, navigatePath }) => {
  const navigate = useNavigate();
  const { title, totalCount, upCount } = item;

  const handleClick = () => {
    if (navigatePath) {
      navigate(navigatePath);
    }
  };

  return (
    <div className="stat-card" onClick={navigatePath ? handleClick : undefined}>
      <div className="stat-header">
        <Body02 fontWeight="semiBold" as="p" className="title">
          {title}
        </Body02>
        {navigatePath && (
          <img src={Arrow} alt="네비게이터" className="nav-icon" />
        )}
      </div>
      <div className="stat-count">
        <div className="up-count">
          <span>
            <img src={UpArrow} alt="상승" className="up-icon" />
          </span>
          <Body01 fontWeight="semiBold" as="span" className="up-text">
            {upCount}
          </Body01>
        </div>
        <Headline01 fontWeight="semiBold" as="p" className="total-count">
          {totalCount.toLocaleString()}
        </Headline01>
      </div>
    </div>
  );
};

// 기본값 설정
HomeStatCard.defaultProps = {
  item: {
    title: 'title',
    totalCount: 0,
    upCount: 0,
  },
};

// PropTypes
HomeStatCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string, // 제목은 문자열
    totalCount: PropTypes.number, // 전체 수는 숫자
    upCount: PropTypes.number, // 증가 수는 숫자
  }),
  navigatePath: PropTypes.string,
};

export default HomeStatCard;
