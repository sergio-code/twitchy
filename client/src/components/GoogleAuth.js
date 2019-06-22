import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

const CLIENT_ID =
    '34166762223-19djordr2cg449nbts16vnmb7i52iokh.apps.googleusercontent.com'

class GoogleAuth extends React.Component {
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId())
        } else {
            this.props.signOut()
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    componentDidMount() {
        // @ts-ignore
        window.gapi.load('client:auth2', () => {
            // @ts-ignore
            window.gapi.client
                .init({ clientId: CLIENT_ID, scope: 'email' })
                .then(() => {
                    // @ts-ignore
                    this.auth = window.gapi.auth2.getAuthInstance()
                    this.onAuthChange(this.auth.isSignedIn.get())
                    this.auth.isSignedIn.listen(this.onAuthChange)
                })
        })
    }

    renderAuthButton() {
        switch (this.props.isSignedIn) {
            case true:
                return (
                    <button
                        onClick={this.onSignOutClick}
                        className="ui red google button"
                    >
                        <i className="google icon" />
                        Sign Out
                    </button>
                )

            case false:
                return (
                    <button
                        onClick={this.onSignInClick}
                        className="ui red google button"
                    >
                        <i className="google icon" />
                        Sign In with Google
                    </button>
                )

            default:
                return <div>...</div>
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth)
