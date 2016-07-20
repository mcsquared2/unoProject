'use strict';

var React = require ('react');
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var ModalBootstrap = require('react-bootstrap');


var ModalForm = React.createClass ({
	getInitialState() {
		return {show: false };
	},

	hideModal () {
		this.setState({ show: false});
	},

	showModal () {
		this.setState({ show: true});
	},


	render () {
	return (
		<div>
			<Button 
			bsStyle="primary" 
			onClick={this.showModal}>
			{this.props.continueButton}
			</Button>


		<Modal 

		show = {this.state.showModal} 
		onHide = {this.hideModal}
		
		>
			<Modal.Header closeButton>
				<Modal.Title>{this.props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h1>{this.props.header}</h1>
				<p>{this.props.paragraph} </p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.hideModal}>Close</Button>
			</Modal.Footer>
		</Modal>
		</div>
		);
	}
});

module.exports = ModalForm;
