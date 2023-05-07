import React, { useState } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import './App.css';

function App() {
	const [barcode, setbarcode] = useState('');
  const [qty, setqty] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const objt = { barcode, qty };
    axios
      .post(
        'https://sheet.best/api/sheets/8d00d980-c73b-476a-a0a5-ef6835f9849a',
        objt
      )
      .then((response) => {
        console.log(response);
        setbarcode('');
        setqty('');
      });
	};

	return (
		<Container fluid className="container">
			<Header as="h2">React google sheet</Header>
			<Form className="form">
				<Form.Field>
					<label>Barcode</label>
					<input
						placeholder="Enter Barcode"
						value={barcode}
            onChange={(e) => setbarcode(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Qty</label>
					<input
						placeholder="Enter Qty"
						value={qty}
            onChange={(e) => setqty(e.target.value)}
					/>
				</Form.Field>

				<Button color="blue" type="submit" onClick={handleSubmit}>
					Submit
				</Button>
			</Form>
		</Container>
	);
}

export default App;