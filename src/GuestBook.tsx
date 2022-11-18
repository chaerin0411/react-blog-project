import React, { useState } from "react";
import axios from "axios";
import { Avatar, Button, List } from "antd";

type GuestBookItem = {
	key: number;
	title: string;
	content: string;
	username: string;
};

const GuestBook = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [data, setData] = useState<GuestBookItem[]>([]);

	const fetchGuestBookItems = async () => {
		const { data } = await axios.get("https://backend-iwc3.onrender.com/guestbook/items");
		console.log("data", data);
		const items: GuestBookItem[] = [];
		for (let i = 0; i < data.length; i++) {
			items.push({
				key: data[i].id,
				title: data[i].title,
				content: data[i].content,
				username: data[i].name,
			});
		}
		setData(items);
	};

	return (
		<>
			<List
				loading={loading}
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(item) => (
					<List.Item>
						<List.Item.Meta
							avatar={
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<Avatar src="https://joeschmoe.io/api/v1/random" />
									<>{item.username}</>
								</div>
							}
							title={item.title}
							description={item.content}
						/>
					</List.Item>
				)}
			/>

			<Button
				onClick={async () => {
					setLoading(true);
					await fetchGuestBookItems();
					setTimeout(() => {
						setLoading(false);
					}, 500);
				}}
			>
				수동 새로고침
			</Button>
		</>
	);
};

export default GuestBook;
