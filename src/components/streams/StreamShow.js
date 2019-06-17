import React from "react"
import { connect } from "react-redux"

class StreamShow extends React.Component {
	render() {
		return <div>{this.props.stream}</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps)(StreamShow)
