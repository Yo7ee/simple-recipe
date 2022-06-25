import React, { useContext } from "react";
import { useNavigate } from "react-router";
import KeywordContext from "../../Context/Keyword";

function SearchBar({ className }) {
	const { keyword, setKeyword } = useContext(KeywordContext);
	const navigate = useNavigate();
	const handleSearch = () => {
		setKeyword(keyword);
		navigate(`/recipes?search=${keyword}`);
	};
	return (
		<div className='header-searchBar'>
			<div className={className}>
				<input
					className='input-search'
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder=' 輸入食譜、食材或創建者名稱'></input>
				<div className='btn-search'>
					<i
						className='fa-solid fa-magnifying-glass'
						onClick={handleSearch}></i>
				</div>
			</div>
		</div>
	);
}
export default SearchBar;
