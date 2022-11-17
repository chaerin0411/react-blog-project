import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Breadcrumb, Layout, Menu, Button } from 'antd';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';

const { Header, Content, Footer } = Layout;

function App() {
	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			const { code } = codeResponse;
			console.log(codeResponse);
			await axios.post("http://localhost:5000/auth/google", {
				code,
			})
		},
		flow: "auth-code",
	});
	
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
			<Button onClick={() => {
				login();
			}}
			>
				로그인
			</Button>
			<GoogleLogin
				onSuccess={(credentialResponse) => {
					console.log(credentialResponse);
				}}
				onError={() => {
					console.log("Login Failed");
				}}
			/>
			<Router>
				<Header>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["1"]}
						items={[
							{
								key: 1,
								label: <Link to="/">Home</Link>,
							},
							{
								key: 2,
								label: <Link to="/resume">Resume</Link>,
							},
							{
								key: 3,
								label: <Link to="/portfolio">Portfolio</Link>,
							},
						]}
					/>
				</Header>
				<Content style={{ padding: "0 50px" }}>
					<Breadcrumb style={{ margin: "16px 0" }}>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>Resume</Breadcrumb.Item>
						<Breadcrumb.Item>Portfolio</Breadcrumb.Item>
					</Breadcrumb>
					<div className="site-layout-content">
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/resume" element={<Resume />} />
							<Route path="/portfolio" element={<Portfolio />} />
						</Routes>
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>©chaerin</Footer>
			</Router>
		</Layout>
	);
}

const Home = () => {
	return <div>홈페이지</div>;
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
