import React from 'react';
import HomeStatCard from './HomeStatCard';
import '../../styles/Home.css';
import { mockData, styleMockData } from '../../data/homeMockData';
import HomeStatListCard from './HomeStatListCard';
import { useEffect, useState } from 'react';
import apiService from '../../services/apiService';
import { teams } from '../../constants/teams';
import { colors } from '../../constants/colors.js';
const transformedTeamInfoDTO = (dto) => {
  return Object.entries(dto).map(([teamId, teamData]) => ({
    /**
     * @todo API upCount 수정 시 반영하기
     */
    // name: teams[teamId].name || 'Unknown',
    // upCount: teamData.upCount || 0,
    // totalCount: teamData.totalCount || 0,
    // color: teams[teamId].color || colors.gray800,
    name: teams[teamId].name || 'Unknown',
    upCount: 0,
    totalCount: teamData || 0,
    color: teams[teamId].color || colors.gray800,
  }));
};
const transformedStyleDTO = (dto) => {
  return Object.entries(dto).map(([styleName, totalCount]) => ({
    /**
     * @todo API upCount 수정 시 반영하기
     */
    name: styleName === '선택 안함' ? styleName : `${styleName} 스타일`,
    upCount: 0,
    totalCount: totalCount || 0,
    color: colors.gray800,
  }));
};
function Home() {
  const [teamData, setTeamData] = useState([]);
  const [styleData, setStyleData] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    userCount: {
      title: '전체 유저수',
      totalCount: 0,
      upCount: 0,
    },
    postCount: {
      title: '전체 게시글수',
      totalCount: 0,
      upCount: 0,
    },
    reportCount: {
      title: '유저 신고',
      totalCount: 0,
      upCount: 0,
    },
    inquiryCount: {
      title: '유저 문의',
      totalCount: 0,
      upCount: 0,
    },
  });
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const { teamSupportCountMap } = await apiService.getHomeTeamInfo();
        const transformedData = transformedTeamInfoDTO(teamSupportCountMap);
        setTeamData(transformedData);
      } catch (error) {
        console.log('❌ API 호출 실패:', error);
      }
    };

    const fetchStyleData = async () => {
      try {
        const { cheerStyleCountMap } = await apiService.getHomeStyleInfo();
        const transformedStyleData = transformedStyleDTO(cheerStyleCountMap);
        setStyleData(transformedStyleData);
      } catch (error) {
        console.log('❌ API 호출 실패:', error);
      }
    };

    const fetchDashBoardData = async () => {
      try {
        const dashboardCountMap = await apiService.getHomeDashboard();
        setDashboardData({
          userCount: {
            title: '전체 유저수',
            totalCount: dashboardCountMap.totalUserCount,
            upCount: 0,
          },
          postCount: {
            title: '전체 게시글수',
            totalCount: dashboardCountMap.totalBoardCount,
            upCount: 0,
          },
          reportCount: {
            title: '유저 신고',
            totalCount: dashboardCountMap.totalReportCount,
            upCount: 0,
          },
          inquiryCount: {
            title: '유저 문의',
            totalCount: dashboardCountMap.totalInquiryCount,
            upCount: 0,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDashBoardData();
    fetchTeamData();
    fetchStyleData();
  }, []);
  return (
    <div className="home">
      {/* HomeStatCard에 데이터 전달 */}
      <section className="stat-container container">
        <HomeStatCard className="card" item={dashboardData.userCount} />
        <HomeStatCard className="card" item={dashboardData.postCount} />
      </section>
      <section className="team-stat-container container">
        <HomeStatListCard title="구단별 가입자 수" dataList={teamData} />
      </section>
      <section className="style-stat-container container">
        <HomeStatListCard title="응원스타일별 가입자 수" dataList={styleData} />
      </section>
      <section className="cs-stat-container container">
        <HomeStatCard
          className="card"
          item={dashboardData.reportCount}
          navigatePath="/reports"
        />
        <HomeStatCard
          className="card"
          item={dashboardData.inquiryCount}
          navigatePath="/inquiries"
        />
      </section>
    </div>
  );
}

export default Home;
