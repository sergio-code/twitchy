import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from '../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchStream(id)
    }

    onDelete = () => {
        const { id } = this.props.match.params
        this.props.deleteStream(id)
    }

    renderActions() {
        return (
            <React.Fragment>
                <button onClick={this.onDelete} className="ui primary button">
                    Delete
                </button>
                <Link to="/" className="ui button">
                    Cancel
                </Link>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Modal
                title="Delete Stream"
                content={`Are you sure you want to delete ${
                    this.props.stream
                        ? 'stream with title: ' + this.props.stream.title
                        : 'this stream?'
                }`}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
    mapStateToProps,
    { fetchStream, deleteStream }
)(StreamDelete)
