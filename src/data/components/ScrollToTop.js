// Here are more informations about the scroll restoration of React Router
// https://reactrouter.com/web/guides/scroll-restoration

import { useRouter } from "next/router";
import { useEffect } from "react";

export default () => {
	const { pathname } = useRouter();

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "auto" });
	}, [pathname]);

	return null;
};
