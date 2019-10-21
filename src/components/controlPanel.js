import React, {Component} from 'react';
import AppContext from './App';
export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
            <AppContext.Consumer>

            <div className='controlPanel'>
                <div 
                    onClick={this.props.start}
                >
                    Start
                </div>
            </div>
                </AppContext.Consumer>

        )
    }
}