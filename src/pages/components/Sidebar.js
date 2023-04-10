import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Link } from "next/link";
import { useRouter } from "next/router";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faSignOutAlt, faTable, faTimes, faLockOpen, faLock, faHome, faTag, faBowlFood, faBell, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Button, Dropdown, Accordion, Navbar } from "@themesberg/react-bootstrap";

import Image from "next/image";
import Routes from "../../data/routes";
import Logo from "../assets/img/icons/logo.svg";
import { faDashcube, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default (props = {}) => {
	const { pathname } = useRouter();
	const [show, setShow] = useState(false);
	const [businessOpen, setBusinessOpen] = useState(false);
	const showClass = show ? "show" : "";

	const onCollapse = () => setShow(!show);

	const BusinessStatus = async () => {
		const data = await (await fetch(`/api/business-status`)).json();
		setBusinessOpen(data.isBusinessOpen);
	};

	const CollapsableNavItem = (props) => {
		const { eventKey, title, icon, children = null } = props;
		const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

		return (
			<Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
				<Accordion.Item eventKey={eventKey}>
					<Accordion.Button as={Nav.Link} className="d-flex justify-content-between align-items-center">
						<span>
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} width={20} height={20} />
							</span>
							<span className="sidebar-text">{title}</span>
						</span>
					</Accordion.Button>
					<Accordion.Body className="multi-level">
						<Nav className="flex-column">{children}</Nav>
					</Accordion.Body>
				</Accordion.Item>
			</Accordion>
		);
	};

	const NavItem = (props) => {
		const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
		const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
		const navItemClassName = link === pathname ? "active" : "";
		const linkProps = external ? { href: link } : { as: Link, href: link };

		return (
			<Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
				<Nav.Link {...linkProps} target={target} className={classNames}>
					<span>
						{icon ? (
							<span className="sidebar-icon">
								<FontAwesomeIcon icon={icon} width={20} height={20} />
							</span>
						) : null}
						{image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

						<span className="sidebar-text">{title}</span>
					</span>
					{badgeText ? (
						<Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">
							{badgeText}
						</Badge>
					) : null}
				</Nav.Link>
			</Nav.Item>
		);
	};

	return (
		<>
			<Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
				<Navbar.Brand className="me-lg-5" as={Link} href={Routes.Dashboard.path}>
					<Image src={Logo} className="navbar-brand-light" />
				</Navbar.Brand>
				<Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
					<span className="navbar-toggler-icon" />
				</Navbar.Toggle>
			</Navbar>
			<CSSTransition timeout={300} in={show} classNames="sidebar-transition">
				<SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
					<div className="sidebar-inner px-4 pt-3">
						<div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
							<Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
								<FontAwesomeIcon icon={faTimes} width={20} height={20} />
							</Nav.Link>
						</div>
						<Nav className="flex-column pt-3 pt-md-0">
							<NavItem external title="Main Website" link={Routes.MainSite.path} icon={faHome} />
							<NavItem title="Dashboard" link={Routes.Dashboard.path} icon={faDashcube} />

							<Dropdown.Divider className="my-3 border-indigo" />

							<NavItem title="Foods" icon={faBowlFood} link={Routes.Foods.path} />
							<NavItem title="Alerts" icon={faBell} link={Routes.Alerts.path} />

							<Dropdown.Divider className="my-3 border-indigo" />

							<NavItem title="Orders" icon={faCartShopping} link={Routes.Orders.path} />
							<NavItem title="Discounts" icon={faTag} link={Routes.Discounts.path} />

							{/* <CollapsableNavItem eventKey="tables/" title="Tables" icon={faTable}>
								<NavItem title="Bootstrap Table" link={Routes.BootstrapTables.path} />
							</CollapsableNavItem>

							<CollapsableNavItem eventKey="examples/" title="Examples" icon={faFileAlt}>
								<NavItem title="Sign In" link={Routes.Signin.path} />
								<NavItem title="Sign Up" link={Routes.Signup.path} />
								<NavItem title="Forgot password" link={Routes.ForgotPassword.path} />
								<NavItem title="Reset password" link={Routes.ResetPassword.path} />
								<NavItem title="Lock" link={Routes.Lock.path} />
								<NavItem title="404 Not Found" link={Routes.NotFound.path} />
								<NavItem title="500 Server Error" link={Routes.ServerError.path} />
							</CollapsableNavItem>

							<CollapsableNavItem eventKey="components/" title="Components" icon={faBoxOpen}>
								<NavItem title="Accordion" link={Routes.Accordions.path} />
								<NavItem title="Alerts" link={Routes.Alerts.path} />
								<NavItem title="Badges" link={Routes.Badges.path} />
								<NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
								<NavItem title="Buttons" link={Routes.Buttons.path} />
								<NavItem title="Forms" link={Routes.Forms.path} />
								<NavItem title="Modals" link={Routes.Modals.path} />
								<NavItem title="Navbars" link={Routes.Navbars.path} />
								<NavItem title="Navs" link={Routes.Navs.path} />
								<NavItem title="Pagination" link={Routes.Pagination.path} />
								<NavItem title="Popovers" link={Routes.Popovers.path} />
								<NavItem title="Progress" link={Routes.Progress.path} />
								<NavItem title="Tables" link={Routes.Tables.path} />
								<NavItem title="Tabs" link={Routes.Tabs.path} />
								<NavItem title="Toasts" link={Routes.Toasts.path} />
								<NavItem title="Tooltips" link={Routes.Tooltips.path} />
							</CollapsableNavItem> */}

							{/* <NavItem title="Settings" icon={faCog} link={Routes.Settings.path} /> */}
							<Button onClick={BusinessStatus} variant="secondary" className="upgrade-to-pro">
								<FontAwesomeIcon icon={businessOpen ? faLockOpen : faLock} className="me-1" width={20} height={20} />
								{/* Open Business */}
								{businessOpen ? "Close Business" : "Open Business"}
							</Button>
						</Nav>
					</div>
				</SimpleBar>
			</CSSTransition>
		</>
	);
};

// Logged in user thing (below line 93)
{
	/* <div className="d-flex align-items-center">
	<div className="user-avatar lg-avatar me-4">
		<Image src={ProfilePicture} className="card-img-top rounded-circle border-white" />
	</div>
	<div className="d-block">
		<h6>Hi, Jane</h6>
		<Button as={Link} variant="secondary" size="xs" to={Routes.Signin.path} className="text-dark">
			<FontAwesomeIcon icon={faSignOutAlt} className="me-2" width={20} height={20} /> Sign Out
		</Button>
	</div>
</div>; */
}
