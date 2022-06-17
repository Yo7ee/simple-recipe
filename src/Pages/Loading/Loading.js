import React from "react";
import "../Loading/Loading.css";

export function Loading() {
	return (
		<div className='loading-cont'>
			<i className='fa-solid fa-egg'></i>
			<i className='fa-solid fa-bacon'></i>
			<i className='fa-solid fa-fish'></i>
			<i className='fa-solid fa-spoon'></i>
		</div>
	);
}

export function ContentLoading() {
	return (
		<div className='contentLoading-cont'>
			<div className='contentLoadingInner'></div>
			<i className='fa-solid fa-bowl-food'></i>
			<div className='contentLoadingOuter'></div>
		</div>
	);
}

export function UploadLoading() {
	return (
		<div className='contentLoading-cont upload'>
			<div className='contentLoadingInner'></div>
			<i className='fa-solid fa-bowl-food'></i>
			<div className='contentLoadingOuter'></div>
		</div>
	);
}
