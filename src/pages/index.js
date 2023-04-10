import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBowlFood, faCartShopping, faCashRegister, faChartLine, faCloudUploadAlt, faDollar, faPlus, faRocket, faTag, faTasks, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown, ButtonGroup } from "@themesberg/react-bootstrap";
import Link from "next/link";
import { Routes } from "./routes";

// import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../components/Widgets";
// import { PageVisitsTable } from "../component-examples/Tables";
// import { trafficShares, totalOrders } from "../data/charts";

export default () => {
	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<Dropdown className="btn-toolbar">
					<Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
						<FontAwesomeIcon icon={faPlus} className="me-2" width={20} height={20} />
						Links
					</Dropdown.Toggle>
					<Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
						<Dropdown.Item className="fw-bold" href={Routes.Foods.path}>
							<FontAwesomeIcon icon={faBowlFood} className="me-2" width={20} height={20} /> Create Food
						</Dropdown.Item>
						<Dropdown.Item className="fw-bold" href={Routes.Alerts.path}>
							<FontAwesomeIcon icon={faBell} className="me-2" width={20} height={20} /> Create Alert
						</Dropdown.Item>
						<Dropdown.Item className="fw-bold" href={Routes.Discounts.path}>
							<FontAwesomeIcon icon={faTag} className="me-2" width={20} height={20} /> Create Discount Code
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item className="fw-bold">
							<FontAwesomeIcon icon={faCartShopping} className="text-danger me-2" width={20} height={20} /> View Orders
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<Row className="justify-content-md-center">
				<h1>Hello! Use the sidebar or menu to travel.</h1>
			</Row>
			{/* <Row className="justify-content-md-center">
				<Col xs={12} className="mb-4 d-none d-sm-block">
					<SalesValueWidget title="Sales Value" value="10,567" percentage={10.57} />
				</Col>
				<Col xs={12} className="mb-4 d-sm-none">
					<SalesValueWidgetPhone title="Sales Value" value="10,567" percentage={10.57} />
				</Col>
				<Col xs={12} sm={6} xl={4} className="mb-4">
					<CounterWidget category="Customers" title="345k" period="Feb 1 - Apr 1" percentage={18.2} icon={faChartLine} iconColor="shape-secondary" />
				</Col>

				<Col xs={12} sm={6} xl={4} className="mb-4">
					<CounterWidget category="Revenue" title="$43,594" period="Feb 1 - Apr 1" percentage={28.4} icon={faCashRegister} iconColor="shape-tertiary" />
				</Col>

				<Col xs={12} sm={6} xl={4} className="mb-4">
					<CircleChartWidget title="Traffic Share" data={trafficShares} />
				</Col>
			</Row>

			<Row>
				<Col xs={12} xl={12} className="mb-4">
					<Row>
						<Col xs={12} xl={8} className="mb-4">
							<Row>
								<Col xs={12} className="mb-4">
									<PageVisitsTable />
								</Col>

								<Col xs={12} lg={6} className="mb-4">
									<TeamMembersWidget />
								</Col>

								<Col xs={12} lg={6} className="mb-4">
									<ProgressTrackWidget />
								</Col>
							</Row>
						</Col>

						<Col xs={12} xl={4}>
							<Row>
								<Col xs={12} className="mb-4">
									<BarChartWidget title="Total orders" value={452} percentage={18.2} data={totalOrders} />
								</Col>

								<Col xs={12} className="px-0 mb-4">
									<RankingWidget />
								</Col>

								<Col xs={12} className="px-0">
									<AcquisitionWidget />
								</Col>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row> */}
		</>
	);
};
