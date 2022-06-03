import React, { useEffect, useState, useContext } from "react";
import { algolia, client } from "../../utils/algolia";
import KeywordContext from "../../Context/Keyword";
import ResultContext from "../../Context/Result";

function FilterPopup() {
	const { keyword, setKeyword, direction, setDirection } =
		useContext(KeywordContext);
	const { results, setResults } = useContext(ResultContext);
	//Mobile Filter/Sorting Btn
	const [filterShow, setFilterShow] = useState(false);
	const [sortShow, setSortShow] = useState(false);
	//Filter
	const [tool, setTool] = useState("");
	const [difficulty, setDifficulty] = useState("");
	const [time, setTime] = useState("");

	//Sorting
	const [sorting, setSorting] = useState(0);
	const handleFiltering = () => {
		//運用array, filter, join將判斷結果轉換為algolia filters格式
		const array = [tool, difficulty, time];
		const filterArray = array.filter((item) => item != "");
		const item = filterArray.join(" AND ");
		console.log(item);
		algolia
			.search(keyword, {
				filters: item,
			})
			.then((result) => {
				setResults(result.hits);
			});
	};
	const handleSorting = (replica) => {
		const indexName = replica;
		client
			.initIndex(indexName)
			.search(keyword)
			.then((result) => {
				setResults(result.hits);
			});
	};

	const handleFilterBtn = (item) => {
		setDirection("up");
		if (item === "filter") {
			setFilterShow(true);
		} else {
			setSortShow(true);
		}
	};
	const handleFilterConfirm = (item) => {
		setDirection("up");
		if (item === "filter") {
			setFilterShow(false);
		} else {
			setSortShow(false);
		}
	};

	useEffect(() => {
		handleFiltering();
	}, [tool, difficulty, time]);
	return (
		<>
			<section
				className={filterShow ? "recipes-filter" : "recipes-filter hide"}>
				<div className='cover'></div>
				<div className='wrap'>
					<div className='recipes-filter-cont'>
						<div className='recipes-filter-list-cont'>
							<div className='recipes-filter-title'>烹煮工具: </div>
							<div className='recipes-filter-list'>
								<label
									className={tool == "" ? "filter-item active" : "filter-item"}>
									<input
										type='radio'
										name='tool'
										value=''
										onChange={() => handleFiltering(setTool(""))}
									/>
									全部
								</label>
								<label
									className={
										tool == "tool:0" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='0'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									烤箱
								</label>
								<label
									className={
										tool == "tool:1" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='1'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									電鍋
								</label>
								<label
									className={
										tool == "tool:2" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='2'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									氣炸鍋
								</label>
								<label
									className={
										tool == "tool:3" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='3'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									平底鍋
								</label>
								<label
									className={
										tool == "tool:4" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='4'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									湯鍋
								</label>
								<label
									className={
										tool == "tool:5" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='tool'
										value='5'
										onChange={(e) => {
											handleFiltering(setTool(`tool:${e.target.value}`));
										}}
									/>
									其他
								</label>
							</div>
						</div>
						<div className='recipes-filter-list-cont'>
							<div className='recipes-filter-title'>烹煮時間: </div>
							<div className='recipes-filter-list'>
								<label
									className={time == "" ? "filter-item active" : "filter-item"}>
									<input
										type='radio'
										name='time'
										value=''
										onChange={() => handleFiltering(setTime(""))}
									/>
									全部
								</label>
								<label
									className={
										time == "totalTimeValue:0"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='time'
										value='0'
										onChange={() =>
											handleFiltering(setTime("totalTimeValue:0"))
										}
									/>
									30 分鐘以下
								</label>
								<label
									className={
										time == "totalTimeValue:1"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='time'
										value='1'
										onChange={() =>
											handleFiltering(setTime("totalTimeValue:1"))
										}
									/>
									0.5 - 1 小時
								</label>
								<label
									className={
										time == "totalTimeValue:2"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='time'
										value='2'
										onChange={() =>
											handleFiltering(setTime("totalTimeValue:2"))
										}
									/>
									1 - 2 小時
								</label>
								<label
									className={
										time == "totalTimeValue:3"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='time'
										value='3'
										onChange={(e) =>
											handleFiltering(setTime("totalTimeValue:3"))
										}
									/>
									2 小時以上
								</label>
							</div>
						</div>
						<div className='recipes-filter-list-cont'>
							<div className='recipes-filter-title'>食譜難度: </div>
							<div className='recipes-filter-list'>
								<label
									className={
										difficulty == "" ? "filter-item active" : "filter-item"
									}>
									<input
										type='radio'
										name='difficulty'
										value=''
										onChange={() => handleFiltering(setDifficulty(""))}
									/>
									全部
								</label>
								<label
									className={
										difficulty == "difficulty:0"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='difficulty'
										value='0'
										onChange={(e) => {
											handleFiltering(
												setDifficulty(`difficulty:${e.target.value}`)
											);
										}}
									/>
									簡單
								</label>
								<label
									className={
										difficulty == "difficulty:1"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='difficulty'
										value='1'
										onChange={(e) => {
											handleFiltering(
												setDifficulty(`difficulty:${e.target.value}`)
											);
										}}
									/>
									中等
								</label>
								<label
									className={
										difficulty == "difficulty:2"
											? "filter-item active"
											: "filter-item"
									}>
									<input
										type='radio'
										name='difficulty'
										value='2'
										onChange={(e) => {
											handleFiltering(
												setDifficulty(`difficulty:${e.target.value}`)
											);
										}}
									/>
									特級廚師
								</label>
							</div>
						</div>
						<button
							className='confirm-btn hide'
							onClick={() => {
								handleFilterConfirm("filter");
							}}>
							確認篩選
						</button>
					</div>
				</div>
			</section>
			<section className={sortShow ? "recipes-sort" : "recipes-sort hide"}>
				<div className='cover'></div>
				<div className='wrap'>
					<div className='recipes-sort-cont'>
						<div className='sort-list'>
							<label
								className={sorting == 0 ? "sort-item active" : "sort-item"}>
								<input
									type='radio'
									name='sort'
									onChange={() => {
										handleSorting("totalTimeValue_asc"), setSorting(0);
									}}
								/>
								<i>烹煮時間</i>
							</label>
							<label
								className={sorting == 1 ? "sort-item active" : "sort-item"}>
								<input
									type='radio'
									name='sort'
									onChange={() => {
										handleSorting("difficulty_asc"), setSorting(1);
									}}
								/>
								<i>食譜難度</i>
							</label>
							<label
								className={sorting == 2 ? "sort-item active" : "sort-item"}>
								<input
									type='radio'
									name='sort'
									onChange={() => {
										handleSorting("hotCount_desc"), setSorting(2);
									}}
								/>
								<i>熱門程度</i>
							</label>
							<label
								className={sorting == 3 ? "sort-item active" : "sort-item"}>
								<input
									type='radio'
									name='sort'
									onChange={() => {
										handleSorting("likedBy_desc"), setSorting(3);
									}}
								/>
								<i>喜愛排名</i>
							</label>
						</div>
						<button
							className='confirm-btn'
							onClick={() => {
								handleFilterConfirm("sort");
							}}>
							確認排序
						</button>
					</div>
				</div>
			</section>
			<div
				className={
					direction == "up"
						? "filter-sort-mobile-btn hide"
						: "filter-sort-mobile-btn"
				}>
				<div
					className='filter-btn'
					onClick={() => {
						handleFilterBtn("filter");
					}}>
					<i className='fa-solid fa-filter'></i>
					篩選
				</div>
				<div
					className='sort-btn'
					onClick={() => {
						handleFilterBtn("sort");
					}}>
					<i className='fa-solid fa-arrow-up-short-wide'></i>
					排序
				</div>
			</div>
		</>
	);
}

export default FilterPopup;
