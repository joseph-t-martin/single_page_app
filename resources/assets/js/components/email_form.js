import React from 'react';
import FormInput from './form_input.js';
import FormButton from './form_button.js';
import FormTextField from './form_text_field.js';

/**
 * Email form component that sends an email to a user
 */
class EmailForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            to : '',
            cc : '',
            bcc : '',
            subject : '',
            message : ''
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    };

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    };

    onClick() {
        if (this.state.to.trim() !== '' && this.state.to.trim() !== '' && this.state.to.trim() !== '') {
            this.sendEmail();
        } else {
            alert('Missing required fields');
        }
    };

    sendEmail() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/email/send",
            data: {
                to: this.state.to,
                cc: this.state.cc,
                bcc: this.state.bcc,
                subject: this.state.subject,
                message: this.state.message,
            },
            success: function(data) {
                console.log(data.result);
                if (data.result === 'success') {
                    alert('Email Sent');
                    this.setState({to: '', cc: '', bcc: '', subject: '', message: ''});
                } else {
                    alert('Unfortunately the email could not be sent at this time')
                }
            }.bind(this),
            error: function() {
                alert('Error sending message. Please ensure all email addresses are valid');
            }.bind(this),
        });
    };

    render() {
        return (
            <div className="panel">
                <div className="panel-body">
                    <h3>Email Form</h3>
                    <p>You can send to multiple email addresses by having them comma separated.</p>
                    <div className="form-group">
                        <FormInput onChange={this.onChange} value={this.state.to} name="to" label="To: *" placeholder="To Email Address"/>
                        <FormInput onChange={this.onChange} value={this.state.cc} name="cc" label="CC:" placeholder="CC Email Address"/>
                        <FormInput onChange={this.onChange} value={this.state.bcc} name="bcc" label="BCC:" placeholder="BCC Email Address"/>
                        <FormInput onChange={this.onChange} value={this.state.subject} name="subject" label="Subject: *" placeholder="Subject"/>
                        <FormTextField onChange={this.onChange} value={this.state.message} name="message" label="Message: *" placeholder="Message Text"/>
                    </div>
                    <FormButton onClick={this.onClick} id="submit" value="Send Email"/>
                </div>
            </div>
        )
    }
}

export default EmailForm;