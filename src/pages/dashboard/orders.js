import React, { useState } from "react";
import { Badge, Tab, Nav, Accordion, Card, Button, Modal } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
	const { success, orders } = await (await fetch(`${process.env.API_URL}/v0/orders/find-all`, { headers: { Authorization: process.env.API_CREDENTIALS } })).json();

	if (success) {
		return {
			props: {
				orders,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

const AccordionComponent = ({ order }) => {
	const [showDefault, setShowDefault] = useState(false);
	const handleClose = () => setShowDefault(false);
	const router = useRouter();
	let singleOrder;

	const getOrder = async (orderId) => {
		singleOrder = await fetch(`/api/database/orders/find-one?id=${orderId}`);
		setShowDefault(true);
	};
	const handleArchive = async () => {
		const data = await (
			await fetch(`/api/database/orders/update`, {
				method: "POST",
				body: JSON.stringify({ id: order._id, finishedOrder: !order.finishedOrder }),
			})
		).json();

		if (data.success) {
			router.replace(router.asPath);
			setShowDefault(false);
		}
	};
	return (
		<>
			<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title className="h6">Order Invoice {order.customer.invoice_prefix}</Modal.Title>
					<Button variant="close" aria-label="Close" onClick={handleClose} />
				</Modal.Header>
				<Modal.Body>
					<>
						<p>
							Name - <strong>{order.customer.name}</strong>
						</p>
						<p>
							Phone Number -<strong>{order.personalDetails?.phoneNumber ? order.personalDetails.phoneNumber : "No Number Saved"}</strong>
						</p>
						<p>
							Address - <strong>{order.customer.shipping.address.line1}</strong>
						</p>
						<p>
							Deliver By -<strong>{order.personalDetails?.timeToDeliver ? order.personalDetails.timeToDeliver : "No Time Saved"}</strong>
						</p>

						<p>
							Email - <strong>{order.customer?.email}</strong>
						</p>
						<p>
							Ordered on - <strong>{new Date(order.orderDate).toLocaleDateString()}</strong>
						</p>

						<p>
							Additional Comments -<strong>{order.personalDetails?.additionalComments ? order.personalDetails.additionalComments : "None"}</strong>
						</p>

						<p style={{ fontSize: "x-large", whiteSpace: "pre-line" }}>
							<br />
							<h4>Menu Item / Quantity</h4>
							{order.orderContents.map((orderItem) => (
								<>
									{orderItem.name ? (
										<p>
											<strong>
												<p>
													{orderItem.name?.replace("-", " ")} / {orderItem.count}
												</p>
											</strong>
											Quantity - {orderItem?.count}
											<br />
											Price - ${orderItem?.total}
											<hr />
										</p>
									) : null}
								</>
							))}
						</p>
					</>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="danger" className="text-white ms-auto" onClick={handleArchive}>
						{order.finishedOrder ? "Unarchive Order" : "Archive Order"}
					</Button>
				</Modal.Footer>
			</Modal>
			<Accordion.Item eventKey={"panel-" + order._id} key={order._id}>
				<Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
					<span className="h6 mb-0 fw-bold">{order.customer.name}</span>
				</Accordion.Button>
				<Accordion.Body>
					<Card.Body className="py-2 px-0">
						<Card.Text className="mb-0">Click to see more</Card.Text>
						<Button onClick={() => getOrder(order._id)}>
							<FontAwesomeIcon icon={faEye} height={20} width={20} />
						</Button>
					</Card.Body>
				</Accordion.Body>
			</Accordion.Item>
		</>
	);
};

const Orders = ({ orders }) => {
	return (
		<>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<h4>Orders</h4>
					<p className="mb-0">View Current and Archived Orders.</p>
				</div>
			</div>

			<Tab.Container defaultActiveKey="current">
				<Nav fill variant="pills" className="flex-column flex-sm-row">
					<Nav.Item>
						<Nav.Link eventKey="current" className="mb-sm-3 mb-md-0">
							Current <Badge bg="secondary">{orders?.filter((order) => order.finishedOrder === false).length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="archived" className="mb-sm-3 mb-md-0">
							Archived <Badge bg="secondary">{orders?.filter((order) => order.finishedOrder === true).length}</Badge>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="current" className="py-4">
						<Accordion defaultActiveKey={orders[0]._id}>
							{orders
								.filter((order) => order.finishedOrder === false)
								.map((order) => (
									<AccordionComponent order={order} />
								))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="archived" className="py-4">
						<Accordion defaultActiveKey={orders[0]._id}>
							{orders
								.filter((order) => order.finishedOrder === true)
								.map((order) => (
									<AccordionComponent order={order} />
								))}
						</Accordion>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</>
	);
};
export default Orders;
