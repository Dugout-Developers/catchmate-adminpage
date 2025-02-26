import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Users from './pages/Users.jsx';
import Posts from './pages/Posts.jsx';
import Reports from './pages/Reports.jsx';
import Inquiries from './pages/Inquiries.jsx';
import Notices from './pages/Notices.jsx';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/FontStyle/GlobalStyle.js';
import PrivateRoute from './components/PrivateRoute.js';
import GoogleLoginPage from './pages/Login/GoogleLoginPage.jsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<GoogleLoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Home />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Layout>
                  <Users />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <Layout>
                  <Posts />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Layout>
                  <Reports />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/inquiries"
            element={
              <PrivateRoute>
                <Layout>
                  <Inquiries />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/notices"
            element={
              <PrivateRoute>
                <Layout>
                  <Notices />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
