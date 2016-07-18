'use strict';

var React = require ('react');

var ModalForm = React.createClass ({
	getInitialState() {
		return {showModal: false };
	},

	close () {
		this.setState({ showModal: false});
	},

	open () {
		this.setState({ showModal: true});
	},


	render () {
	return (
		<div>
			<Button
				bsStyle="primary"
				bsSize="small"
				onClick={this.open}
				>
				{this.props.continueButton}
				</Button>


		<Modal show = {this.state.showModal} onHide = {this.close}>
			<Modal.Header closeButton>
				<Modal.Title id = "contained-modal-title-lg">{this.props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h1>{this.props.header}</h1>
				<p>{this.props.paragraph} </p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
		</div>
		);
	}
});

module.exports = ModalForm;
