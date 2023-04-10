import React from "react";
import { Card, Accordion } from "@themesberg/react-bootstrap";

export default ({ order }) => {
	return (
		<Accordion.Item eventKey={"panel-" + order._id}>
			<Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
				<span className="h6 mb-0 fw-bold">{order.customer.name}</span>
			</Accordion.Button>
			<Accordion.Body>
				<Card.Body className="py-2 px-0">
					<Card.Text className="mb-0">Click to see more</Card.Text>
				</Card.Body>
			</Accordion.Body>
		</Accordion.Item>
	);
};
