import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Button, Container } from "@themesberg/react-bootstrap";
import Image from "next/image";

import { Link } from "next/link";

import Routes from "../data/routes";
import NotFoundImage from "./assets/img/illustrations/404.svg";

export default () => {
	return (
		<main>
			<section className="vh-100 d-flex align-items-center justify-content-center">
				<Container>
					<Row>
						<Col xs={12} className="text-center d-flex align-items-center justify-content-center">
							<div>
								<Card.Link as={Link} to={Routes.Dashboard.path}>
									<Image src={NotFoundImage} className="img-fluid w-75" alt="Error Image" />
								</Card.Link>
								<h1 className="text-primary mt-5">
									Page not <span className="fw-bolder">found</span>
								</h1>
								<p className="lead my-4">Oops! Looks like you followed a bad link.</p>
								<Button as={Link} variant="primary" className="animate-hover" href={Routes.Dashboard.path}>
									<FontAwesomeIcon icon={faChevronLeft} className="animate-left-3 me-3 ms-2" width={20} height={20} />
									Go back home
								</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	);
};
