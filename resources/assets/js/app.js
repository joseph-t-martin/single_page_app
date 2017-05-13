import React from 'react';
import ReactDOM from 'react-dom';
import EmailForm from './components/email_form.js';

class App extends React.Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3" />
                        <div className="col-md-6">
                            <EmailForm />
                        </div>
                        <div className="col-md-3" />
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));