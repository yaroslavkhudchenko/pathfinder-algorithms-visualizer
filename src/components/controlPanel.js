import React, {Component} from 'react';
import { AppContext } from './App';
export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
           

            <div className='controlPanel'>
                <AppContext.Consumer>
                <div onClick={this.context.animateAlgorithm}>
                    Start
                </div>
                </AppContext.Consumer>
            </div>
                

        )
    }
}