import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
	const [time, setTime] = useState(new Date());

	const timer = setInterval(() => {
		setTime(new Date());
	}, 1000);

	useEffect(() => {
		return () => {
			clearInterval(timer);
		};
	}, [timer]);

	return (
		<Layout className="layout">
			<h3>현재시간 : {time.toLocaleTimeString()}</h3>
			<Router>
				<Header>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['1']}
						items={[
							{
								key: 1,
								label: <Link to="/">Home</Link>,
							},
							{
								key: 2,
								label: <Link to="/resume">이력서</Link>,
							},
							{
								key: 3,
								label: <Link to="/portfolio">포트폴리오</Link>,
							},
						]}
					/>
				</Header>
				<Content style={{ padding: '0 50px' }}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/resume" element={<Resume />} />
						<Route path="/portfolio" element={<Portfolio />} />
					</Routes>
				</Content>
				<Footer style={{ textAlign: 'center' }}>©chaerin</Footer>
			</Router>
		</Layout>
	);
}

const Home = () => {
	return <>홈페이지</>;
};

const Resume = () => {
	return (
		<div>
			<h3>자기소개</h3>
			<h3>이름 : 전채린</h3>
			<h3>학력</h3>
			<>
				<li>경인고등학교</li>
				<li>동양미래대학교</li>
			</>
			<h3>경력</h3>
			<>
				<li>씨큐프라임 인턴 1개월</li>
			</>
		</div>
	);
};

const Portfolio = () => {
	return <>포트폴리오</>;
};

export default App;
