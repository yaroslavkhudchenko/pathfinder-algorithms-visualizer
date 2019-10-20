import React, {Component} from 'react';
import Grid from './Grid';

export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
            <div className='controlPanel'>
                <div 
                    onClick={Grid.startAlgorithm}
                >
                    Start
                </div>
            </div>
        )
    }
}