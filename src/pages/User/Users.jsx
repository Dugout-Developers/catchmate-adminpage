import React from 'react';
import TeamUserStatCard from './TeamUserStatCard';
import { teams } from '../../constants/teams';
import { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import '../../styles/User/User.css';
const transformedTeamData = (dto) => {
  var sum = 0;
  const listData = Object.entries(dto).map(([teamId, teamData]) => {
    sum += teamData; // sum 누적

    return {
      // return을 명시적으로 사용
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
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const { teamSupportCountMap } = await apiService.getHomeTeamInfo();
        const teamData = transformedTeamData(teamSupportCountMap);

        console.log(teamData);
        setTeamStatData(teamData);
      } catch (error) {
        console.log('❌ API 호출 실패:', error);
      }
    };

    fetchTeamData();
  }, []);
  return (
    <div className="user-container">
      <TeamUserStatCard teamDatas={teamStatData} />
    </div>
  );
}

export default Users;
