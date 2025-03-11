import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/User/UserDetail.css';
import { loginTypeInfo } from '../../constants/loginType.js';
import DefaultUserImage from '../../assets/img/defaultImg.svg';
import { formatDate } from '../../services/dateFormmat.js';
import { Body01, Body02 } from '../../styles/FontStyle/Typography';
import CMButton, { ButtonType } from '../../components/CMButton.jsx';
const UserDetail = ({ user }) => {
  return (
    <section className="container">
      <section className="user-detail-container">
        <div className="top-profile">
          <div className="profile-img">
            <img
              src={user.profileImageUrl || DefaultUserImage}
              alt="유저 프로필 이미지"
            />
          </div>
          <Body01 fontWeight="semiBold" className="nickname">
            {user.nickName}
          </Body01>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            성별
          </Body02>
          <Body02 fontWeight="semiBold" className="gender-item">
            {user.gender}
          </Body02>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            생년월일
          </Body02>
          <Body02 fontWeight="semiBold" className="birth-item">
            {formatDate(user.joinedAt)}
          </Body02>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            이메일
          </Body02>
          <div className="email-item-container">
            <img
              src={loginTypeInfo[user.socialType]?.image}
              alt={loginTypeInfo[user.socialType]?.type}
              className="login-icon"
            />
            <Body02 className="email-text" fontWeight="semiBold">
              {user.email}
            </Body02>
          </div>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            응원구단
          </Body02>
          <Body02 fontWeight="semiBold" className="clubInfo-item">
            {user.clubInfo.name}
          </Body02>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            응원 스타일
          </Body02>
          <Body02 fontWeight="semiBold" className="style-item">
            임시 텍스트
          </Body02>
        </div>
        <div className="list-container">
          <Body02 fontWeight="regular" className="item-title">
            가입일자
          </Body02>
          <Body02 fontWeight="semiBold" className="joinedAt-item">
            {formatDate(user.joinedAt)}
          </Body02>
        </div>
      </section>
      <section className="button-container">
        <CMButton
          className="suspand-button"
          title="활동 정지"
          onClick={() => alert('활동정지 버튼 클릭됨!')}
          type={ButtonType.OUTLINED}
        />
        <CMButton
          className="ban-button"
          title="강제 탈퇴"
          onClick={() => alert('강제탈퇴 버튼 클릭됨!')}
          type={ButtonType.FILLED}
        />
      </section>
    </section>
  );
};

// PropTypes
UserDetail.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired,
    profileImageUrl: PropTypes.string,
    gender: PropTypes.oneOf(['M', 'F', 'm', 'f', null]),
    email: PropTypes.string.isRequired,
    socialType: PropTypes.string.isRequired,
    joinedAt: PropTypes.string.isRequired,

    // 클럽 정보 객체
    clubInfo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      homeStadium: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserDetail;
