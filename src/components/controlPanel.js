import React, {Component} from 'react';
import { AppContext } from './App';

export default class ControlPanel extends Component {

    componentDidMount() {
        console.log(this.props);
    } 
    
    render() {
        return (
            <AppContext.Consumer>
                {context =>
                    
                    <div className='controlPanel'>
                        <div onClick={context.startAlgorithm}>
                            Start
                        </div>
                    </div>
                }
                
                </AppContext.Consumer>
        )
    }
}