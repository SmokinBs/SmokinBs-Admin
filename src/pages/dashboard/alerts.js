import React, { useState } from "react";
import { Accordion, Card, Button, Modal, Form, Row, Col, InputGroup, Alert } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Datetime from "react-datetime";
import moment from "moment-timezone";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
	const { success, alerts } = await (await fetch(`${process.env.API_URL}/v0/alerts/find-all`, { headers: { Authorization: process.env.API_CREDENTIALS } })).json();
	if (success) {
		return {
			props: {
				alerts,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

const Alerts = ({ alerts }) => {
	const [showDefault, setShowDefault] = useState(false);
	const handleClose = () => setShowDefault(false);
	const [showCreate, setShowCreate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [expire, setExpire] = React.useState("");
	const router = useRouter();

	const submitForm = async (e) => {
		e.preventDefault();
		await fetch(`/api/database/alerts/create`, {
			method: "POST",
			body: JSON.stringify({
				title: e.target[0].value,
				content: e.target[2].value,
				expirationDate: e.target[1].value,
			}),
		});
		router.replace(router.asPath);
		setShowDefault(false);
		setShowCreate(true);

		setTimeout(() => setShowCreate(false), 3000);
	};
	const AccordionComponent = ({ alert }) => {
		const router = useRouter();

		const handleDelete = async () => {
			if (confirm("Are you sure you want to delete this? !! THIS IS IRREVERSIBLE !!")) {
				const data = await (
					await fetch(`/api/database/alerts/delete`, {
						method: "POST",
						body: JSON.stringify({ id: alert._id }),
					})
				).json();

				if (data.success) {
					router.replace(router.asPath);
					setShowDelete(true);
					setShowDefault(false);

					setTimeout(() => setShowDelete(false), 3000);
				}
			}
		};
		return (
			<>
				<Accordion.Item eventKey={"panel-" + alert._id} key={alert._id}>
					<Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
						<span className="h6 mb-0 fw-bold">{alert.title}</span>
					</Accordion.Button>
					<Accordion.Body>
						<Card.Body className="py-2 px-0">
							<Card.Text className="mb-0">Content: {alert.content}</Card.Text>
							<Card.Text className="mb-0">Date Posted: {moment(alert.timePosted).format("MM/DD/YYYY")}</Card.Text>
							<Card.Text className="mb-0">Expires: {moment(alert.expirationDate).format("MM/DD/YYYY")}</Card.Text>
							<Button variant="danger" onClick={() => handleDelete(alert._id)}>
								<FontAwesomeIcon icon={faTrash} height={20} width={20} />
							</Button>
						</Card.Body>
					</Accordion.Body>
				</Accordion.Item>
			</>
		);
	};
	return (
		<>
			<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title className="h6">Creating New Alert</Modal.Title>
					<Button variant="close" aria-label="Close" onClick={handleClose} />
				</Modal.Header>
				<Modal.Body>
					<>
						<Form onSubmit={submitForm}>
							<Row>
								<Col md={6} className="mb-3">
									<Form.Group id="name">
										<Form.Label>Title</Form.Label>
										<Form.Control required type="text" placeholder="Title of Alert" />
									</Form.Group>
								</Col>

								<Col md={6} className="mb-3">
									<Form.Group id="name">
										<Form.Label>Expiration Date</Form.Label>
										<Datetime
											timeFormat={false}
											closeOnSelect={false}
											onChange={setExpire}
											renderInput={(props, openCalendar) => (
												<InputGroup>
													<InputGroup.Text>
														<FontAwesomeIcon icon={faCalendarAlt} width={20} height={20} />
													</InputGroup.Text>
													<Form.Control required type="text" value={expire ? moment(expire).format("MM/DD/YYYY") : ""} placeholder="mm/dd/yyyy" onFocus={openCalendar} onChange={() => {}} />
												</InputGroup>
											)}
										/>
									</Form.Group>
								</Col>
							</Row>
							<Col className="mb-3">
								<Form.Group id="description">
									<Form.Label>Content</Form.Label>
									<Form.Control required as="textarea" placeholder="Alert Content" />
								</Form.Group>
							</Col>
							<Button type="submit" variant="secondary" className="text-white ms-auto">
								Create
							</Button>
						</Form>
					</>
				</Modal.Body>
			</Modal>
			<div className="d-flex flex-row-reverse flex-wrap flex-md-nowrap align-items-center py-4">
				<Alert variant="success" show={showCreate}>
					<div className="d-flex justify-content-between">
						<div>
							<FontAwesomeIcon icon={faCheck} className="me-1" width={20} height={20} />
							Successfully Created Alert!
						</div>
					</div>
				</Alert>
				<Alert variant="danger" show={showDelete}>
					<div className="d-flex justify-content-between">
						<div>
							<FontAwesomeIcon icon={faCheck} className="me-1" width={20} height={20} />
							Successfully Deleted Alert!
						</div>
					</div>
				</Alert>
			</div>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<h4>Alerts</h4>
				</div>
				<Button variant="outline-primary" onClick={() => setShowDefault(true)}>
					<FontAwesomeIcon icon={faPlus} className="me-2" width={20} height={20} />
					<span>Create Alert</span>
				</Button>
			</div>

			<Accordion defaultActiveKey={alerts[0]?._id}>
				{alerts.map((alert) => (
					<AccordionComponent alert={alert} />
				))}
			</Accordion>
		</>
	);
};
export default Alerts;
