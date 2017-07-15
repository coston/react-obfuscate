var React = require('react');
var ReactDOM = require('react-dom');
var Obfuscate = require('react-obfuscate');

var App = React.createClass({
	render () {
		return (
			<div>
				<p>
					Phone: <Obfuscate tel='205-454-1234' /><br />
					Email: <Obfuscate 
					email='hello@coston.cool' 
					headers={
						{subject:'Question from the website'},
						{cc:'friend@coston.cool'}
					}/>
				</p>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
