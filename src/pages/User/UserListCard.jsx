import React from 'react';
import '../../styles/User/UserListCard.css';
import { Body01, Body02 } from '../../styles/FontStyle/Typography';
import { loginTypeInfo } from '../../constants/loginType.js';
import DefaultUserImage from '../../assets/img/defaultImg.svg';
import { formatDate } from '../../services/dateFormmat.js';
import Pagination from '../../components/Pagination';
import NavIcon from '../../assets/img/arrow.svg';
const UserListCard = ({ userData, pageData, onPageChange }) => {
  const { currentPage, totalPages, isFirst, isLast } = pageData;

  return (
    <div className="user-table-wrapper">
      <div className="table-container">
        {' '}
        {/* ✅ 테이블을 감싸는 컨테이너 추가 */}
        <table className="user-list-container">
          <thead>
            <tr className="list-header">
              <th className="header-item profile-col">
                <Body02 fontWeight="semiBold">프로필</Body02>
              </th>
              <th className="header-item nickname-col">
                <Body02 fontWeight="semiBold">닉네임</Body02>
              </th>
              <th className="header-item team-col">
                <Body02 fontWeight="semiBold">응원구단</Body02>
              </th>
              <th className="header-item gender-col">
                <Body02 fontWeight="semiBold">성별</Body02>
              </th>
              <th className="header-item email-col">
                <Body02 fontWeight="semiBold">이메일(소셜)</Body02>
              </th>
              <th className="header-item join-col">
                <Body02 fontWeight="semiBold">가입일자</Body02>
              </th>
              <th className="header-item action-col"></th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.userId} className="user-item">
                <td className="userImage-item">
                  <img
                    src={user.profileImageUrl || DefaultUserImage}
                    alt="유저 프로필 이미지"
                  />
                </td>
                <td className="nickname-item">
                  <Body01 fontWeight="semiBold">{user.nickName}</Body01>
                </td>
                <td className="team-item">
                  <Body01 fontWeight="semiBold">{user.clubInfo.name}</Body01>
                </td>
                <td className="gender-item">
                  <Body01 fontWeight="semiBold">{user.gender}</Body01>
                </td>
                <td className="email-item">
                  <div className="email-item-container">
                    <img
                      src={loginTypeInfo[user.socialType].image}
                      alt={loginTypeInfo[user.socialType].type}
                      className="login-icon"
                    />
                    <Body01 className="email-text" fontWeight="semiBold">
                      {user.email}
                    </Body01>
                  </div>
                </td>
                <td className="join-item">
                  <Body01 fontWeight="semiBold">
                    {formatDate(user.joinedAt)}
                  </Body01>
                </td>
                <td className="action-item">
                  <img
                    src={NavIcon}
                    alt="네비게이션아이콘"
                    className="nav-icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ 페이지네이션을 테이블 하단에 고정 */}
      <div className="pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isFirst={isFirst}
          isLast={isLast}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default UserListCard;
