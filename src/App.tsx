import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, Button } from "antd";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import GuestBook from "./components/GuestBook";
import Resume from "./components/Resume";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = [
	"Home",
	"Resume",
	"Portfolio",
	"Guestbook",
].map((item, index) => ({
	key: index,
	label: <Link to={`/${item}`}>{item}</Link>,
}));

const items2: MenuProps["items"] = [
	UserOutlined,
	LaptopOutlined,
	NotificationOutlined,
].map((icon, index) => {
	const key = String(index + 1);

	return {
		key: `sub${key}`,
		icon: React.createElement(icon),
		label: `subnav ${key}`,

		children: new Array(4).fill(null).map((_, j) => {
			const subKey = index * 4 + j + 1;
			return {
				key: subKey,
				label: `option${subKey}`,
			};
		}),
	};
});

function App() {
	const login = useGoogleLogin({
		onSuccess: async (codeResponse) => {
			const { code } = codeResponse;
			console.log(codeResponse);
			await axios.post("http://localhost:5000/auth/google", {
				code,
			});
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
		<Layout>
			<h3>현재시간 : {time.toLocaleTimeString()}</h3>
			<Button
				onClick={() => {
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
						items={items1}
					/>
				</Header>
				<Layout>
					<Sider width={200}>
						<Menu
							mode="inline"
							defaultSelectedKeys={["1"]}
							defaultOpenKeys={["sub1"]}
							style={{ height: "100%", borderRight: 0 }}
							items={items2}
						/>
					</Sider>
					<Layout style={{ padding: "0 24px" }}>
						<Breadcrumb style={{ margin: "16px 0" }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb>
						<Content
							className="site-layout-background"
							style={{
								padding: 24,
								minHeight: 280,
								background: "#fff",
							}}
						>
							<Routes>
								<Route path="/Home" element={<Home />} />
								<Route path="/Resume" element={<Resume />} />
								<Route
									path="/Portfolio"
									element={<Portfolio />}
								/>
								<Route
									path="/Guestbook"
									element={<GuestBook />}
								/>
							</Routes>
						</Content>
					</Layout>
				</Layout>
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
