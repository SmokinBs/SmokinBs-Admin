import "bootstrap/dist/css/bootstrap.css";
import "./scss/volt.scss";
import "react-datetime/css/react-datetime.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Head from "next/head";

const PageWithLoader = ({ component: Component, pageProps }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<Preloader show={loaded ? false : true} />
			<Component {...pageProps} />
		</>
	);
};
const PageWithSidebar = ({ component: Component, pageProps }) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setLoaded(true), 1000);
		return () => clearTimeout(timer);
	}, []);

	let toggleSettings;
	let localStorageIsSettingsVisible;
	let [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);
	useEffect(() => {
		localStorageIsSettingsVisible = () => {
			return localStorage.getItem("settingsVisible") === "false" ? false : true;
		};
		toggleSettings = () => {
			setShowSettings(!showSettings);
			localStorage.setItem("settingsVisible", !showSettings);
		};
	}, []);

	return (
		<>
			<Preloader show={loaded ? false : true} />
			<Sidebar />

			<main className="content">
				<Navbar />
				<Component {...pageProps} />
				<Footer toggleSettings={toggleSettings} showSettings={showSettings} />
			</main>
		</>
	);
};
const toTitleCase = (str) => {
	str = str.split("/").join(" ");
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
const MyApp = ({ Component, pageProps }) => {
	const router = useRouter();

	if (["/404", "/500", "/user/sign-in", "/user/sign-up", "/user/lock", "/user/reset-password", "/user/forgot-password"].includes(router.pathname)) {
		return (
			<>
				<Head>
					<title>{toTitleCase(router.pathname) + " | Smokin Bs BBQ"}</title>
					<link rel="icon" href="/favicon.svg" />
				</Head>
				<PageWithLoader component={Component} pageProps={pageProps} />
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>{toTitleCase(router.pathname) + " | Smokin Bs BBQ"}</title>
					<link rel="icon" href="/favicon.svg" />
				</Head>
				<PageWithSidebar component={Component} pageProps={pageProps} />
			</>
		);
	}
};

export default MyApp;
