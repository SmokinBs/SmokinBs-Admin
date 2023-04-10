import React from "react";
import moment from "moment-timezone";
import { Row, Col, Card } from "@themesberg/react-bootstrap";

export default (props) => {
	const currentYear = moment().get("year");
	const showSettings = props.showSettings;

	const toggleSettings = (toggle) => {
		props.toggleSettings(toggle);
	};

	return (
		<div>
			<footer className="footer section py-5">
				<Row>
					<Col xs={12} lg={6} className="mb-4 mb-lg-0">
						<p className="mb-0 text-center text-xl-left">
							Copyright © {`${currentYear} `}
							<Card.Link href="https://www.smokinbsbbq.tk" target="_blank" className="text-blue text-decoration-none fw-normal">
								Smokin Bs BBQ
							</Card.Link>
						</p>
					</Col>
					<Col xs={12} lg={6}>
						<ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
							<li className="list-inline-item px-0 px-sm-2">
								<Card.Link href="https://www.smokinbsbbq.tk/#prices" target="_blank">
									Prices
								</Card.Link>
							</li>
							<li className="list-inline-item px-0 px-sm-2">
								<Card.Link href="https://www.smokinbsbbq.tk/menu" target="_blank">
									Menu
								</Card.Link>
							</li>
							<li className="list-inline-item px-0 px-sm-2">
								<Card.Link href="https://www.smokinbsbbq.tk/contact" target="_blank">
									Contact
								</Card.Link>
							</li>
						</ul>
					</Col>
				</Row>
			</footer>
		</div>
	);
};

// For later to add settings (maybe?)
/* {showSettings ? (
	<Card className="theme-settings">
		<Card.Body className="pt-4">
			<Button
				className="theme-settings-close"
				variant="close"
				size="sm"
				aria-label="Close"
				onClick={() => {
					toggleSettings(false);
				}}
			/>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<p className="m-0 mb-1 me-3 fs-7">
					Made
					<span role="img" aria-label="gratitude">
						💙
					</span>
				</p>
				<GitHubButton href="" data-size="large" data-show-count="true" aria-label="Star themesberg/volt-react-dashboard on GitHub">
					Star
				</GitHubButton>
			</div>
			<Button href="" target="_blank" variant="primary" className="mb-3 w-100">
				<FontAwesomeIcon icon={faDownload} className="me-1" width={20} height={20} /> Download
			</Button>
			<p className="fs-7 text-gray-700 text-center">Available in the following technologies:</p>
			<div className="d-flex justify-content-center">
				<Card.Link href="" target="_blank">
					<OverlayTrigger placement="top" trigger={["hover", "focus"]} overlay={<Tooltip>Bootstrap 5 · The most popular HTML, CSS, and JS library in the world.</Tooltip>}>
						<Image src={BS5Logo} className="image image-xs" />
					</OverlayTrigger>
				</Card.Link>

				<Card.Link href="" target="_blank">
					<OverlayTrigger placement="top" trigger={["hover", "focus"]} overlay={<Tooltip>React · A JavaScript library for building user interfaces.</Tooltip>}>
						<Image src={ReactLogo} className="image image-xs" />
					</OverlayTrigger>
				</Card.Link>

				<Card.Link href="" target="_blank">
					<OverlayTrigger placement="top" trigger={["hover", "focus"]} overlay={<Tooltip>Laravel · Most popular PHP framework in the world.</Tooltip>}>
						<Image src={LaravelLogo} className="image image-xs" />
					</OverlayTrigger>
				</Card.Link>
			</div>
		</Card.Body>
	</Card>
) : (
	<Card
		className="theme-settings theme-settings-expand"
		onClick={() => {
			toggleSettings(true);
		}}>
		<Card.Body className="p-3 py-2">
			<span className="fw-bold h6">
				<FontAwesomeIcon icon={faCogs} className="me-1 fs-7" width={20} height={20} /> Settings
			</span>
		</Card.Body>
	</Card>
)} */
