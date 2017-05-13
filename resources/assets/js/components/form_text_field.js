import React from 'react';

class FormTextField extends React.Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <textarea type="text"
                    name={this.props.name}
                      className="form-control"
                      placeholder={this.props.placeholder}
                      value={this.props.value}
                      onChange={this.props.onChange} />
            </div>
        )
    }
}

export default FormTextField;