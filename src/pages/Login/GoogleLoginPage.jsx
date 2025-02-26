import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import apiService from '../../services/apiService';
import { Headline01 } from '../../styles/FontStyle/Typography';
import Logo from '../../assets/img/logo.svg';
import '../../styles/GoogleLoginPage.css';
const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  // 백엔드 로그인 로직
  const handleLogin = async (googleLoginData) => {
    if (!googleLoginData) {
      console.error('[❌ ERROR] 구글 로그인 실패: 사용자 정보 없음');
      return;
    }

    try {
      const { accessToken, refreshToken, isFirstLogin } =
        await apiService.postLogin({
          email: googleLoginData.userEmail,
          providerId: googleLoginData.providerId,
          provider: 'google',
          picture: googleLoginData.picture,
          fcmToken: '',
        });

      if (isFirstLogin) {
        alert('등록된 아이디가 아닙니다.');
      } else {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('❌ 네이버 로그인 후 백엔드 요청 실패:', error);
    }
  };
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
            const decodedToken = jwtDecode(res.credential);
            const userEmail = decodedToken.email;
            const providerId = decodedToken.sub;
            const picture = decodedToken.picture;

            handleLogin({ userEmail, providerId, picture });
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

const GoogleLoginPage = () => {
  return (
    <div className="google-login-page">
      <section className="login-container">
        <img src={Logo} alt="로고 이미지" className="logo-icon" />
        <Headline01 fontWeight="semiBold" as="p" className="title">
          CatchMate 관리자 페이지
        </Headline01>
        <GoogleLoginButton />
      </section>
    </div>
  );
};

export default GoogleLoginPage;
