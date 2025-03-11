import React, { useEffect, useState } from 'react';
import TeamUserStatCard from './TeamUserStatCard';
import { teams } from '../../constants/teams';
import apiService from '../../services/apiService';
import '../../styles/User/User.css';
import { Body02 } from '../../styles/FontStyle/Typography';
import UserListCard from './UserListCard';
import UserDetail from './UserDetail';

const transformedTeamData = (dto) => {
  var sum = 0;
  const listData = Object.entries(dto).map(([teamId, teamData]) => {
    sum += teamData;
    return {
      name: teams[teamId]?.name || 'Unknown',
      totalCount: teamData || 0,
    };
  });

  return [
    {
      name: '전체',
      totalCount: sum,
    },
    ...listData,
  ];
};

function Users() {
  const [teamStatData, setTeamStatData] = useState([]);
  const [userListData, setUserListData] = useState([]);
  const [pageData, setPageData] = useState({
    currentPage: 1, // ✅ API에 없으므로 직접 관리
    totalPages: 1,
    isFirst: true,
    isLast: true,
  });
  const [selectedClub, setSelectedClub] = useState('전체');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const { teamSupportCountMap } = await apiService.getHomeTeamInfo();
        setTeamStatData(transformedTeamData(teamSupportCountMap));
      } catch (error) {
        console.log('❌ API 호출 실패:', error);
      }
    };

    fetchTeamData();
  }, []);

  // ✅ currentPage가 변경될 때마다 데이터를 요청하는 useEffect
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const { userInfoList, totalPages, isFirst, isLast } =
          await apiService.getUserListData(selectedClub, pageData.currentPage);

        setUserListData(userInfoList);
        setPageData((prev) => ({
          ...prev,
          totalPages: Math.max(totalPages, 1), // ✅ totalPages가 0이면 최소 1 설정
          isFirst,
          isLast,
        }));
      } catch (error) {
        console.log('❌ API 호출 실패:', error);
      }
    };

    fetchUserList();
  }, [pageData.currentPage, selectedClub]); // ✅ 페이지 또는 필터 변경 시 API 요청
  // ✅ 유저 선택 핸들러 (클릭한 유저 디테일 보이기)
  const handleUserSelect = (user) => {
    if (user.userId === selectedUser?.userId) {
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
    }
  };
  // ✅ 팀 선택 핸들러 (클릭한 팀으로 필터링)
  const handleTeamSelect = (teamName) => {
    setSelectedClub(teamName);
    setPageData((prev) => ({
      ...prev,
      currentPage: 1, // ✅ 팀을 변경하면 페이지를 1로 초기화
    }));
  };

  // ✅ 페이지 변경 핸들러
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageData.totalPages) return;
    setPageData((prev) => ({
      ...prev,
      currentPage: newPage, // ✅ API에 없으므로 직접 변경
    }));
  };

  return (
    <div className="user-container">
      {selectedUser ? (
        <UserDetail user={selectedUser} />
      ) : (
        <section className="user-nav">
          <TeamUserStatCard
            teamDatas={teamStatData}
            selectedTeam={selectedClub}
            onTeamSelect={handleTeamSelect}
          />
        </section>
      )}
      <section className="user-list">
        <div className="list-title">
          <Body02 fontWeight="semiBold" as="span" className="select-team">
            {`${selectedClub} 유저 `}
          </Body02>
          <Body02 fontWeight="semiBold" as="span" className="select-team-count">
            {teamStatData?.find((team) => team.name === selectedClub)
              ?.totalCount || 0}
          </Body02>
          <Body02 fontWeight="semiBold" as="span">
            명
          </Body02>
        </div>
        <UserListCard
          userData={userListData}
          pageData={pageData}
          onPageChange={handlePageChange}
          onUserSelect={handleUserSelect}
        />
      </section>
    </div>
  );
}

export default Users;
