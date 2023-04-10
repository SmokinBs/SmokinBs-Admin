import { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Card, Form, Container, InputGroup, Button } from "@themesberg/react-bootstrap";

import Documentation from "./Documentation";

export default () => {
	return (
		<article>
			<Container className="px-0">
				<Row className="d-flex flex-wrap flex-md-nowrap align-items-center py-4">
					<Col className="d-block mb-4 mb-md-0">
						<h1 className="h2">Forms</h1>
						<p className="mb-0">Use form elements such as text inputs, textareas, file uploads and many more to get input from you users.</p>
					</Col>
				</Row>

				<Documentation
					title="Example"
					description={
						<p>
							Form elements are an important part of the UI to receive text input from the users. The <code>&#x3C;Form&#x3E;</code> component can be used to create forms, form groups, labels, and input elements inside the UI. Check out the following example for a simple email input field and a textarea field:
						</p>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Group className="mb-3">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="Input fields with icon"
					description={
						<p>
							You can also add icons to the left or right side of the input field by using the <code>&#x3C;InputGroup&#x3E;</code> component and using the <code>&#x3C;InputGroup.Text&#x3E;</code> element with an icon element inside it, either after or before the <code>&#x3C;Form.Control&#x3E;</code> element.
						</p>
					}
					scope={{ Form, InputGroup, FontAwesomeIcon, faSearch }}
					imports={`import { Form, InputGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";`}
					example={`<Form>
  <Form.Group className="mb-3">
    <Form.Label>Icon Left</Form.Label>
    <InputGroup>
      <InputGroup.Text><FontAwesomeIcon icon={faSearch} width={20} height={20} /></InputGroup.Text>
      <Form.Control type="text" placeholder="Search" />
    </InputGroup>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>Icon Right</Form.Label>
    <InputGroup>
      <Form.Control type="text" placeholder="Search" />
      <InputGroup.Text><FontAwesomeIcon icon={faSearch} width={20} height={20} /></InputGroup.Text>
    </InputGroup>
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="Validation"
					description={
						<p>
							You can easily update the styles of a valid or invalid styles input field by using the <code>isValid</code> or <code>isInvalid</code> attributes. Additionally, you can use the <code>&#x3C;Form.Control.Feedback&#x3E;</code> component to write the message regarding the success or error message.
						</p>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Group className="mb-3">
    <Form.Label>Username</Form.Label>
    <Form.Control required isInvalid type="text" />
    <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
  </Form.Group>
  <Form.Group className="mb-3">
    <Form.Label>First name</Form.Label>
    <Form.Control required isValid type="text" defaultValue="Mark" />
    <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="Select input"
					description={
						<p>
							The <code>&#x3C;Form.Select&#x3E;</code> component can be used for option selection from the user. You can use the <code>&#x3C;option&#x3E;</code> elements to add multiple options and use the <code>defaultValue</code> attribute to set the default value of the select field.
						</p>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Group className="mb-3">
    <Form.Label>Example select</Form.Label>
    <Form.Select>
      <option defaultValue>Open this select menu</option>
      <option>One</option>
      <option>Two</option>
      <option>Three</option>
    </Form.Select>
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="Multiple select"
					description=""
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Group className="mb-3">
    <Form.Label>Example multiple select</Form.Label>
    <Form.Select multiple>
      <option defaultValue>Open this select menu</option>
      <option>One</option>
      <option>Two</option>
      <option>Three</option>
    </Form.Select>
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="Textarea"
					description={
						<p>
							You can create a textarea input field by adding the <code>as="textarea"</code> modifier attribute to the <code>&#x3C;Form.Control&#x3E;</code> component.
						</p>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Group>
    <Form.Label>Example textarea</Form.Label>
    <Form.Control as="textarea" rows="4" placeholder="Enter your message..." />
  </Form.Group>
</Form>`}
				/>

				<Documentation
					title="File upload"
					description={
						<p>
							If you want to use an input field to upload files, you need to add the <code>type="file"</code> attribute to the <code>&#x3C;Form.Control&#x3E;</code> component.
						</p>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Control type="file" />
</Form>`}
				/>

				<Documentation
					title="Checkboxes"
					description={
						<>
							<p>
								Use the <code>&#x3C;Form.Check&#x3E;</code> component to create checkbox items. If you want to disable on them, you need to add the <code>disabled</code> attribute.
							</p>
							<p>
								Make sure the is a <code>{'id="*"'}</code> and <code>{'htmlFor="*"'}</code> attribute for each element so that clicking on the text will also toggle the element.
							</p>
						</>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <Form.Check label="Default checkbox" id="checkbox1" htmlFor="checkbox1" />
  <Form.Check disabled label="Disabled checkbox" id="checkbox2" htmlFor="checkbox2" />
</Form>`}
				/>

				<Documentation
					title="Radio buttons"
					description={
						<>
							<p>
								If you want to use radio buttons, you need to use the <code>&#x3C;Form.Check&#x3E;</code> component with the <code>type="radio"</code> modifier. You can disable the element by using the <code>disabled</code> attribute.
							</p>
							<p>
								Make sure the is a <code>{'id="*"'}</code> and <code>{'htmlFor="*"'}</code> attribute for each element so that clicking on the text will also toggle the element.
							</p>
						</>
					}
					scope={{ Form }}
					imports={`import { Form } from '@themesberg/react-bootstrap';`}
					example={`<Form>
  <fieldset>
    <Form.Check
      defaultChecked
      type="radio"
      defaultValue="option1"
      label="Default radio"
      name="exampleRadios"
      id="radio1"
      htmlFor="radio1"
      />

    <Form.Check
      type="radio"
      defaultValue="option2"
      label="Second default radio"
      name="exampleRadios"
      id="radio2"
      htmlFor="radio2"
      />

    <Form.Check
      disabled
      type="radio"
      defaultValue="option3"
      label="Disabled radio"
      name="exampleRadios"
      id="radio3"
      htmlFor="radio3"
      />
  </fieldset>
</Form>`}
				/>

				<Documentation
					title="Datepicker"
					description={
						<p>
							Use the <code>&#x3C;Datetime&#x3E;</code> component to use a datepicker as an input field. You can read more about the options that you can use for this component by reading the{" "}
							<Card.Link href="https://www.npmjs.com/package/react-datetime" target="_blank">
								react-datetime
							</Card.Link>{" "}
							documentation.
						</p>
					}
					scope={{ Datetime, Form, InputGroup, FontAwesomeIcon, faCalendarAlt, moment }}
					imports={`import React, { useState } from "react";
import { Form, InputGroup } from '@themesberg/react-bootstrap';
import Datetime from "react-datetime";
import moment from "moment-timezone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";`}
					example={`const Datepicker = () => {
  const [birthday, setBirthday] = React.useState("");

  return(
    <Form>
      <Form.Group className="mb-3">
        <Datetime
          timeFormat={false}
          closeOnSelect={false}
          onChange={setBirthday}
          renderInput={(props, openCalendar) => (
            <InputGroup>
              <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} width={20} height={20} /></InputGroup.Text>
              <Form.Control
                required
                type="text"
                value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                placeholder="mm/dd/yyyy"
                onFocus={openCalendar}
                onChange={() => { }} />
            </InputGroup>
          )} />
      </Form.Group>
    </Form>
  );
}

render( <Datepicker /> )`}
				/>
			</Container>
		</article>
	);
};

export const GeneralInfoForm = () => {
	const [birthday, setBirthday] = useState("");

	return (
		<Card border="light" className="bg-white shadow-sm mb-4">
			<Card.Body>
				<h5 className="mb-4">General information</h5>
				<Form>
					<Row>
						<Col md={6} className="mb-3">
							<Form.Group id="firstName">
								<Form.Label>First Name</Form.Label>
								<Form.Control required type="text" placeholder="Enter your first name" />
							</Form.Group>
						</Col>
						<Col md={6} className="mb-3">
							<Form.Group id="lastName">
								<Form.Label>Last Name</Form.Label>
								<Form.Control required type="text" placeholder="Also your last name" />
							</Form.Group>
						</Col>
					</Row>
					<Row className="align-items-center">
						<Col md={6} className="mb-3">
							<Form.Group id="birthday">
								<Form.Label>Birthday</Form.Label>
								<Datetime
									timeFormat={false}
									onChange={setBirthday}
									renderInput={(props, openCalendar) => (
										<InputGroup>
											<InputGroup.Text>
												<FontAwesomeIcon icon={faCalendarAlt} />
											</InputGroup.Text>
											<Form.Control required type="text" value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""} placeholder="mm/dd/yyyy" onFocus={openCalendar} onChange={() => {}} />
										</InputGroup>
									)}
								/>
							</Form.Group>
						</Col>
						<Col md={6} className="mb-3">
							<Form.Group id="gender">
								<Form.Label>Gender</Form.Label>
								<Form.Select defaultValue="0">
									<option value="0">Gender</option>
									<option value="1">Female</option>
									<option value="2">Male</option>
								</Form.Select>
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col md={6} className="mb-3">
							<Form.Group id="emal">
								<Form.Label>Email</Form.Label>
								<Form.Control required type="email" placeholder="name@company.com" />
							</Form.Group>
						</Col>
						<Col md={6} className="mb-3">
							<Form.Group id="phone">
								<Form.Label>Phone</Form.Label>
								<Form.Control required type="number" placeholder="+12-345 678 910" />
							</Form.Group>
						</Col>
					</Row>

					<h5 className="my-4">Address</h5>
					<Row>
						<Col sm={9} className="mb-3">
							<Form.Group id="address">
								<Form.Label>Address</Form.Label>
								<Form.Control required type="text" placeholder="Enter your home address" />
							</Form.Group>
						</Col>
						<Col sm={3} className="mb-3">
							<Form.Group id="addressNumber">
								<Form.Label>Number</Form.Label>
								<Form.Control required type="number" placeholder="No." />
							</Form.Group>
						</Col>
					</Row>
					<Row>
						<Col sm={4} className="mb-3">
							<Form.Group id="city">
								<Form.Label>City</Form.Label>
								<Form.Control required type="text" placeholder="City" />
							</Form.Group>
						</Col>
						<Col sm={4} className="mb-3">
							<Form.Group className="mb-2">
								<Form.Label>Select state</Form.Label>
								<Form.Select id="state" defaultValue="0">
									<option value="0">State</option>
									<option value="AL">Alabama</option>
									<option value="AK">Alaska</option>
									<option value="AZ">Arizona</option>
									<option value="AR">Arkansas</option>
									<option value="CA">California</option>
									<option value="CO">Colorado</option>
									<option value="CT">Connecticut</option>
									<option value="DE">Delaware</option>
									<option value="DC">District Of Columbia</option>
									<option value="FL">Florida</option>
									<option value="GA">Georgia</option>
									<option value="HI">Hawaii</option>
									<option value="ID">Idaho</option>
									<option value="IL">Illinois</option>
									<option value="IN">Indiana</option>
									<option value="IA">Iowa</option>
									<option value="KS">Kansas</option>
									<option value="KY">Kentucky</option>
									<option value="LA">Louisiana</option>
									<option value="ME">Maine</option>
									<option value="MD">Maryland</option>
									<option value="MA">Massachusetts</option>
									<option value="MI">Michigan</option>
									<option value="MN">Minnesota</option>
									<option value="MS">Mississippi</option>
									<option value="MO">Missouri</option>
									<option value="MT">Montana</option>
									<option value="NE">Nebraska</option>
									<option value="NV">Nevada</option>
									<option value="NH">New Hampshire</option>
									<option value="NJ">New Jersey</option>
									<option value="NM">New Mexico</option>
									<option value="NY">New York</option>
									<option value="NC">North Carolina</option>
									<option value="ND">North Dakota</option>
									<option value="OH">Ohio</option>
									<option value="OK">Oklahoma</option>
									<option value="OR">Oregon</option>
									<option value="PA">Pennsylvania</option>
									<option value="RI">Rhode Island</option>
									<option value="SC">South Carolina</option>
									<option value="SD">South Dakota</option>
									<option value="TN">Tennessee</option>
									<option value="TX">Texas</option>
									<option value="UT">Utah</option>
									<option value="VT">Vermont</option>
									<option value="VA">Virginia</option>
									<option value="WA">Washington</option>
									<option value="WV">West Virginia</option>
									<option value="WI">Wisconsin</option>
									<option value="WY">Wyoming</option>
								</Form.Select>
							</Form.Group>
						</Col>
						<Col sm={4}>
							<Form.Group id="zip">
								<Form.Label>ZIP</Form.Label>
								<Form.Control required type="tel" placeholder="ZIP" />
							</Form.Group>
						</Col>
					</Row>
					<div className="mt-3">
						<Button variant="primary" type="submit">
							Save All
						</Button>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
};
