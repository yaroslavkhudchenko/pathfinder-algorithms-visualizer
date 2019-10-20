import React, {Component} from 'react';

export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
            <div className='controlPanel'>
                <div 
                    onClick={this.props.start}
                >
                    Start
                </div>
            </div>
        )
    }
}