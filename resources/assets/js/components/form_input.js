import React from 'react';

/**
 * Provides a html input with basic form styling
 */
class FormInput extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input name={this.props.name}
                       type="text"
                       className="form-control"
                       placeholder={this.props.placeholder}
                       value={this.props.value}
                       onChange={this.props.onChange} />
            </div>
        )
    }
}

export default FormInput;