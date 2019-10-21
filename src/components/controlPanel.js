import React, {Component} from 'react';
export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
           

            <div className='controlPanel'>
                <div onClick={this.context.animateAlgorithm}>
                    Start
                </div>
            </div>
                

        )
    }
}