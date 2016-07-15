'use strict';

var React = require ('react');

var SignUpModal = React.createClass ({
	render () {
	return (
		<Modal {...this.props} bsSize = "large" aria-labelledby = "contained-modal-title-lg">
			<Modal.Header closeButton>
				<Modal.Title id = "contained-modal-title-lg">Confirmation</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<h1>We Sent You an Email! </h1>
				<p> Please check your email in order to access your account </p>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={this.props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
		);
	}
});

module.exports = "SignUpModal"
