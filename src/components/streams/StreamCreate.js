import React from "react"
import { connect } from "react-redux"
import { Field, reduxForm } from "redux-form"
import { createStream } from "../../actions"

class StreamCreate extends React.Component {
	renderError({ touched, error }) {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			)
		}
	}

	renderInput = ({ input, label, meta }) => {
		return (
			<div className={`field${meta.touched && meta.error ? " error" : ""}`}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{this.renderError(meta)}
			</div>
		)
	}

	onSubmit = formValues => {
		this.props.createStream(formValues)
	}

	render() {
		return (
			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field component={this.renderInput} name="title" label="Enter Title" />
				<Field component={this.renderInput} name="description" label="Enter Description" />
				<button className="ui button primary">Submit</button>
			</form>
		)
	}
}

const validate = formValues => {
	const errors = {}

	if (!formValues.title) {
		errors.title = "You must enter a title"
	}

	if (!formValues.description) {
		errors.description = "You must enter a description"
	}
	return errors
}

const formWrapped = reduxForm({
	form: "streamCreate",
	validate
})(StreamCreate)

export default connect(
	null,
	{ createStream }
)(formWrapped)
