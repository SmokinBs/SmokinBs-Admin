import React, { useState } from "react";
import { Accordion, Card, Button, Modal, Form, Row, Col, InputGroup, Alert } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faCheck, faDollarSign, faPercentage, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import moment from "moment-timezone";
import Datetime from "react-datetime";

export const getServerSideProps = async () => {
	const { success, discounts } = await (await fetch(`${process.env.API_URL}/v0/discounts/find-all`, { headers: { Authorization: process.env.API_CREDENTIALS } })).json();

	if (success) {
		return {
			props: {
				discounts,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

const Discounts = ({ discounts }) => {
	const [showDefault, setShowDefault] = useState(false);
	const handleClose = () => setShowDefault(false);
	const [showCreate, setShowCreate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [expire, setExpire] = React.useState("");
	const [start, setStart] = React.useState("");
	const [showPercentage, setShowPercentage] = React.useState(true);
	const router = useRouter();

	const submitForm = async (e) => {
		e.preventDefault();
		await fetch(`/api/database/discounts/create`, {
			method: "POST",
			body: JSON.stringify({
				type: e.target[0].value,
				percentageAmount: e.target[1].value ? e.target[1].value.padStart(3, ".0") : null,
				fixedAmount: e.target[2].value,
				startDate: e.target[3].value,
				expirationDate: e.target[4].value,
			}),
		});
		router.replace(router.asPath);
		setShowDefault(false);
		setShowCreate(true);

		setTimeout(() => setShowCreate(false), 3000);
	};
	const AccordionComponent = ({ discount }) => {
		const router = useRouter();

		const handleDelete = async () => {
			if (confirm("Are you sure you want to delete this? !! THIS IS IRREVERSIBLE !!")) {
				const data = await (
					await fetch(`/api/database/discounts/delete`, {
						method: "POST",
						body: JSON.stringify({ id: discount._id }),
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
				<Accordion.Item eventKey={"panel-" + discount._id} key={discount._id}>
					<Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
						<span className="h6 mb-0 fw-bold">Code: {discount.code}</span>
					</Accordion.Button>
					<Accordion.Body>
						<Card.Body className="py-2 px-0">
							<Card.Text className="mb-0">
								Type: {discount.type}
								<br />
								{discount.type == "Percentage" ? `Percentage Amount: ${discount.percentageAmount}%` : `Fixed Amount: $${discount.fixedAmount}`}
								<br />
								Start Date: {moment.utc(discount.startDate).format("MM/DD/YYYY")}
								<br />
								Expiration Date: {moment.utc(discount.expirationDate).format("MM/DD/YYYY")}
							</Card.Text>
							<Button variant="danger" onClick={() => handleDelete(discount._id)}>
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
					<Modal.Title className="h6">Creating Discount</Modal.Title>
					<Button variant="close" aria-label="Close" onClick={handleClose} />
				</Modal.Header>
				<Modal.Body>
					<>
						<Form onSubmit={submitForm}>
							<Row>
								<Col md={6} className="mb-3">
									<Form.Group id="category">
										<Form.Label>Type</Form.Label>
										<Form.Select
											onChange={(s) => {
												s.target.value == "Percentage" ? setShowPercentage(true) : setShowPercentage(false);
											}}
											defaultValue={showPercentage ? "Percentage" : "Fixed"}>
											<option value="Percentage">Percentage</option>
											<option value="Fixed">Fixed</option>
										</Form.Select>
									</Form.Group>
								</Col>
								<Col md={6} className="mb-3" style={{ display: showPercentage ? "block" : "none" }}>
									<Form.Group id="name">
										<Form.Label>Percentage Amount</Form.Label>

										<InputGroup>
											<Form.Control required={showPercentage} type="number" placeholder="Percentage Amount" min={1} max={100} />
											<InputGroup.Text>
												<FontAwesomeIcon icon={faPercentage} width={20} height={20} />
											</InputGroup.Text>
										</InputGroup>
									</Form.Group>
								</Col>
								<Col md={6} className="mb-3" style={{ display: showPercentage ? "none" : "block" }}>
									<Form.Group id="name">
										<Form.Label>Fixed Amount</Form.Label>

										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faDollarSign} width={20} height={20} />
											</InputGroup.Text>
											<Form.Control required={!showPercentage} type="number" placeholder="Fixed Amount" />
										</InputGroup>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col md={6} className="mb-3">
									<Form.Group id="name">
										<Form.Label>Start Date</Form.Label>
										<Datetime
											timeFormat={false}
											closeOnSelect={false}
											onChange={setStart}
											renderInput={(props, openCalendar) => (
												<InputGroup>
													<InputGroup.Text>
														<FontAwesomeIcon icon={faCalendarAlt} width={20} height={20} />
													</InputGroup.Text>
													<Form.Control required type="text" value={start ? moment.utc(start).format("MM/DD/YYYY") : ""} placeholder="mm/dd/yyyy" onFocus={openCalendar} onChange={() => {}} />
												</InputGroup>
											)}
										/>
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
													<Form.Control required type="text" value={expire ? moment.utc(expire).format("MM/DD/YYYY") : ""} placeholder="mm/dd/yyyy" onFocus={openCalendar} onChange={() => {}} />
												</InputGroup>
											)}
										/>
									</Form.Group>
								</Col>
							</Row>
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
							Successfully Created Discount!
						</div>
					</div>
				</Alert>
				<Alert variant="danger" show={showDelete}>
					<div className="d-flex justify-content-between">
						<div>
							<FontAwesomeIcon icon={faCheck} className="me-1" width={20} height={20} />
							Successfully Deleted Discount!
						</div>
					</div>
				</Alert>
			</div>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<h4>Discounts</h4>
				</div>
				<Button variant="outline-primary" onClick={() => setShowDefault(true)}>
					<FontAwesomeIcon icon={faPlus} className="me-2" width={20} height={20} />
					<span>Create Discount</span>
				</Button>
			</div>

			{/* Maybe Change later for percentage and fixed to have different tabs */}
			<Accordion defaultActiveKey={discounts[0]?._id}>
				{discounts.map((discount) => (
					<AccordionComponent discount={discount} />
				))}
			</Accordion>
		</>
	);
};
export default Discounts;
