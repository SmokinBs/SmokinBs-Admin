import React, { useState } from "react";
import { Badge, Tab, Nav, Accordion, Card, Button, Modal, Form, Row, Col, InputGroup, Toast, Alert } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faDollarSign, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

export const getServerSideProps = async () => {
	const { success, foods } = await (await fetch(`${process.env.API_URL}/v0/foods/find-all`, { headers: { Authorization: process.env.API_CREDENTIALS } })).json();

	if (success) {
		return {
			props: {
				foods,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

const Foods = ({ foods }) => {
	const [showDefault, setShowDefault] = useState(false);
	const handleClose = () => setShowDefault(false);
	const [showCreate, setShowCreate] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const router = useRouter();

	const submitForm = async (e) => {
		e.preventDefault();
		await fetch(`/api/database/foods/create`, {
			method: "POST",
			body: JSON.stringify({
				name: e.target[0].value,
				price: e.target[1].value,
				category: e.target[2].value,
				description: e.target[3].value,
			}),
		});
		router.replace(router.asPath);
		setShowDefault(false);
		setShowCreate(true);

		setTimeout(() => setShowCreate(false), 3000);
	};
	const AccordionComponent = ({ food }) => {
		food.name = food.name.replace("-", " ");

		const [showDefault, setShowDefault] = useState(false);
		const handleClose = () => setShowDefault(false);
		const router = useRouter();

		const handleDelete = async () => {
			if (confirm("Are you sure you want to delete this? !! THIS IS IRREVERSIBLE !!")) {
				const data = await (
					await fetch(`/api/database/foods/delete`, {
						method: "POST",
						body: JSON.stringify({ id: food._id }),
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
		const submitForm = async (e) => {
			e.preventDefault();
			await fetch(`/api/database/foods/update`, {
				method: "POST",
				body: JSON.stringify({
					id: food._id,
					name: e.target[0].value,
					price: e.target[1].value,
					category: e.target[2].value,
					description: e.target[3].value,
				}),
			});
			router.replace(router.asPath);
			setShowUpdate(true);
			setShowDefault(false);

			setTimeout(() => setShowUpdate(false), 3000);
		};
		return (
			<>
				<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
					<Modal.Header>
						<Modal.Title className="h6">Editing {food.name}</Modal.Title>
						<Button variant="close" aria-label="Close" onClick={handleClose} />
					</Modal.Header>
					<Modal.Body>
						<>
							<Form onSubmit={submitForm}>
								<Row>
									<Col md={6} className="mb-3">
										<Form.Group id="name">
											<Form.Label>Name</Form.Label>
											<Form.Control required type="text" defaultValue={food.name} />
										</Form.Group>
									</Col>
									<Col md={6} className="mb-3">
										<Form.Group id="price">
											<Form.Label>Price</Form.Label>
											<InputGroup>
												<InputGroup.Text>
													<FontAwesomeIcon icon={faDollarSign} width={20} height={20} />
												</InputGroup.Text>
												<Form.Control required type="number" defaultValue={food.price} />
											</InputGroup>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col className="mb-3">
										<Form.Group id="category">
											<Form.Label>Category</Form.Label>
											<Form.Select defaultValue={food.category}>
												<option value="Meats">Meats</option>
												<option value="Sides">Sides</option>
												<option value="Desserts">Desserts</option>
												<option value="plates">Plates</option>
												<option value="No-Category">No Category</option>
											</Form.Select>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col className="mb-3">
										<Form.Group id="description">
											<Form.Label>Description</Form.Label>
											<Form.Control required as="textarea" defaultValue={food.shortDescription} />
										</Form.Group>
									</Col>
								</Row>
								<Button type="submit" variant="secondary" className="text-white ms-auto">
									Save
								</Button>
							</Form>
						</>
					</Modal.Body>
				</Modal>
				<Accordion.Item eventKey={"panel-" + food._id} key={food._id}>
					<Accordion.Button variant="link" className="w-100 d-flex justify-content-between">
						<span className="h6 mb-0 fw-bold">{food.name}</span>
					</Accordion.Button>
					<Accordion.Body>
						<Card.Body className="py-2 px-0">
							<Card.Text className="mb-0">
								Description: {food.shortDescription}
								<br />
								Price: ${food.price}
							</Card.Text>
							<Button className="me-2" onClick={() => setShowDefault(true)}>
								<FontAwesomeIcon icon={faPencil} height={20} width={20} />
							</Button>
							<Button variant="danger" onClick={() => handleDelete(food._id)}>
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
					<Modal.Title className="h6">Creating New Item</Modal.Title>
					<Button variant="close" aria-label="Close" onClick={handleClose} />
				</Modal.Header>
				<Modal.Body>
					<>
						<Form onSubmit={submitForm}>
							<Row>
								<Col md={6} className="mb-3">
									<Form.Group id="name">
										<Form.Label>Name</Form.Label>
										<Form.Control required type="text" placeholder="Name of Item" />
									</Form.Group>
								</Col>
								<Col md={6} className="mb-3">
									<Form.Group id="price">
										<Form.Label>Price</Form.Label>
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faDollarSign} width={20} height={20} />
											</InputGroup.Text>
											<Form.Control required type="number" placeholder="Price of Item (30 | 10| 5)" />
										</InputGroup>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col className="mb-3">
									<Form.Group id="category">
										<Form.Label>Category</Form.Label>
										<Form.Select>
											<option value="Meats">Meats</option>
											<option value="Sides">Sides</option>
											<option value="Desserts">Desserts</option>
											<option value="plates">Plates</option>
											<option value="No-Category">No Category</option>
										</Form.Select>
									</Form.Group>
								</Col>
							</Row>
							<Row>
								<Col className="mb-3">
									<Form.Group id="description">
										<Form.Label>Description</Form.Label>
										<Form.Control required as="textarea" placeholder="Give a short description about the product" />
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
							Successfully Created Item!
						</div>
					</div>
				</Alert>

				<Alert variant="success" show={showUpdate}>
					<div className="d-flex justify-content-between">
						<div>
							<FontAwesomeIcon icon={faCheck} className="me-1" width={20} height={20} />
							Successfully Updated Item!
						</div>
					</div>
				</Alert>
				<Alert variant="danger" show={showDelete}>
					<div className="d-flex justify-content-between">
						<div>
							<FontAwesomeIcon icon={faCheck} className="me-1" width={20} height={20} />
							Successfully Deleted Item!
						</div>
					</div>
				</Alert>
			</div>
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
				<div className="d-block mb-4 mb-md-0">
					<h4>Foods</h4>
				</div>
				<Button variant="outline-primary" onClick={() => setShowDefault(true)}>
					<FontAwesomeIcon icon={faPlus} className="me-2" width={20} height={20} />
					<span>Create Item</span>
				</Button>
			</div>

			<Tab.Container defaultActiveKey="meats">
				<Nav
					fill
					variant="pills"
					className="flex-column flex-sm-row"
					style={{
						borderRadius: "25px",
					}}>
					<Nav.Item>
						<Nav.Link eventKey="*" className="mb-sm-3 mb-md-0">
							All <Badge bg="secondary">{foods.length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="meats" className="mb-sm-3 mb-md-0">
							Meats <Badge bg="secondary">{foods.filter((food) => food.category === "Meats").length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="sides" className="mb-sm-3 mb-md-0">
							Sides <Badge bg="secondary">{foods.filter((food) => food.category === "Sides").length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="desserts" className="mb-sm-3 mb-md-0">
							Desserts <Badge bg="secondary">{foods.filter((food) => food.category === "Desserts").length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="plates" className="mb-sm-3 mb-md-0">
							Plates <Badge bg="secondary">{foods.filter((food) => food.category === "Plates").length}</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="no-category" className="mb-sm-3 mb-md-0">
							No Category <Badge bg="secondary">{foods.filter((food) => food.category === "No-Category").length}</Badge>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="*" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods.map((food) => (
								<AccordionComponent food={food} />
							))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="meats" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods
								.filter((food) => food.category === "Meats")
								.map((food) => (
									<AccordionComponent food={food} />
								))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="sides" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods
								.filter((food) => food.category === "Sides")
								.map((food) => (
									<AccordionComponent food={food} />
								))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="desserts" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods
								.filter((food) => food.category === "Desserts")
								.map((food) => (
									<AccordionComponent food={food} />
								))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="plates" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods
								.filter((food) => food.category === "Plates")
								.map((food) => (
									<AccordionComponent food={food} />
								))}
						</Accordion>
					</Tab.Pane>
					<Tab.Pane eventKey="no-category" className="py-4">
						<Accordion defaultActiveKey={foods[0]._id}>
							{foods
								.filter((food) => food.category === "No-Category")
								.map((food) => (
									<AccordionComponent food={food} />
								))}
						</Accordion>
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		</>
	);
};
export default Foods;
