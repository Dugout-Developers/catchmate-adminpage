// 컬러 상수값
const colors = {
  // grayScale
  gray50: '#FAFAFC',
  gray100: '#F2F2F5',
  gray200: '#E9E9EE',
  gray300: '#CCCCD0',
  gray400: '#AFAFB2',
  gray500: '#949297',
  gray600: '#76747B',
  gray700: '#595860',
  gray800: '#3B3B45',
  gray900: '#1E1E25',

  // brandColor
  primary: '#FD5E5E',
  brand500: '#FD5E5E',
  brand50: '#FFDFDF',

  // teamColor
  hanhwa: '#ED702D',
  kia: '#D62E34',
  ssg: '#BD272C',
  lg: '#B2243B',
  kiwoom: '#761426',
  samsung: '#2559A6',
  lotte: '#0A1D3F',
  nc: '#0C1C3A',
  doosan: '#12122E',
  kt: '#2B2A29',
};

// 📌 CSS 변수로 변환하는 함수 (CSS 파일에서 직접 사용할 수 있도록)
const setCSSVariables = () => {
  const root = document.documentElement;
  Object.keys(colors).forEach((key) => {
    root.style.setProperty(`--${key}`, colors[key]);
  });
};

export { colors, setCSSVariables };
