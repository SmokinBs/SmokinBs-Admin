import React from "react";
import Image from "next/image";

import Spinner from "../assets/img/icons/spinner.svg";

export default (props) => {
	const { show } = props;

	return (
		<div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
			<Image className="loader-element animate__animated animate__jackInTheBox" src={Spinner} height={100} />
		</div>
	);
};
