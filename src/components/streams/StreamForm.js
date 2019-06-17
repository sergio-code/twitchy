import React from "react"
import { Field, reduxForm } from "redux-form"

class StreamForm extends React.Component {
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
		this.props.onSubmit(formValues)
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

export default reduxForm({
	form: "streamForm",
	validate
})(StreamForm)
