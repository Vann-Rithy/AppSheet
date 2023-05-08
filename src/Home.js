import React, { useState, useEffect } from "react";
import Quagga from "quagga";
import { Button, Form, Container, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
import './Home.css'
export default function EnterCode() {
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
	const startScanner = () => {
		Quagga.init(
		  {
			inputStream: {
			  name: "Live",
			  type: "LiveStream",
			  target: document.querySelector("#scanner-container"),
			},
			decoder: {
			  readers: ["ean_reader"],
			},
		  },
		  (err) => {
			if (err) {
			  console.log(err);
			  return;
			}
			Quagga.start();
		  }
		);
	  
		Quagga.onDetected((data) => {
		  setbarcode(data.codeResult.code);
		  Quagga.stop();
		});
	  };
	  
	  useEffect(() => {
		return () => {
		  Quagga.offDetected();
		  Quagga.stop();
		};
	  }, []);	  

	return (
		<Container fluid className="container">
			<Header as="h2">React google sheet</Header>
            <div id="scanner-container"/>
			<Button  onClick={startScanner}>
        Scanner
      </Button>
			<Form className="form">
				<Form.Field>
					<label>Barcode</label>
					<input
						placeholder="Enter Barcode"
						type="number"
						value={barcode}
            onChange={(e) => setbarcode(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label>Qty</label>
					<input
						placeholder="Enter Qty"
						type="number"
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