import React from 'react';

/**
 * Provides a html button with basic form styling
 */
class FormButton extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <button onClick={this.props.onClick} className="btn btn-primary form-control" name="action">
                    {this.props.value}
                </button>
            </div>
        )
    }
}

export default FormButton;