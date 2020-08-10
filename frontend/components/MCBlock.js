import React, {Component} from "react";

import Button from "react-bootstrap/Button";


class MCBlock extends Component {
    constructor(props) {
        super(props);
    this.state={
        selected: null
    }}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.questions !== this.props.questions) {
            this.setState({selected: null})
        }}

    set(value, choice){
        //sets selection but only if not displaying the answers already
        if(!this.props.answerDisplay){
            this.props.answerCallback(value);
            this.setState({selected: choice})
        }
    }

    getVariant(id,letter){
        //buttons tracked by text(correct answer) and letter (selected)
        const correctA = this.props.correctAnswer;
        const buttonText = this.props.questions[id];
        const selected = this.state.selected;

        //default
        if (this.props.answerDisplay === 0)
           return "success";
        //if neither selected nor correct
        if (buttonText !== correctA && letter !== selected)
            return "success-outline";
        //selected but not correct
        if (buttonText !== correctA && letter === selected)
            return "secondary";
        //correct but not selected
        if  (buttonText === correctA && letter !== selected)
            return "warning";
        //correct and selected
        return "primary"
    }

    getStyle(id,letter){
        //buttons tracked by text(correct answer) and letter (selected)
        const correctA = this.props.correctAnswer;
        const buttonText = this.props.questions[id];
        const selected = this.state.selected;

        //default
        if (this.props.answerDisplay === 0){
            if(letter === selected){
                return "qButton-active"
            }
            return "qButton-default";
        }
        //if neither selected nor correct
        if (buttonText !== correctA && letter !== selected)
            return "qButton-default";
        //selected but not correct
        if (buttonText !== correctA && letter === selected)
            return "qButton-incorrect";
        //correct but not selected
        if  (buttonText === correctA && letter !== selected)
            return "qButton-correct-unselected";
        //correct and selected
        return "qButton-correct"
    }

        render(){
            return(
                    <table className={"buttons"}>
                    <tbody>
                        <tr>
                            <td height="75">
                                <Button
                                    className={this.getStyle(0,"A")}
                                    variant={this.getVariant(0,"A")}
                                    onClick={()=>this.set(0,"A")}> {decodeURIComponent(this.props.questions[0])}</Button>
                            </td>
                            <td height="75">
                                <Button
                                    className={this.getStyle(1,"B")}
                                    variant={this.getVariant(1,"B")}

                                    onClick={()=>this.set(1,"B")}> {decodeURIComponent(this.props.questions[1])}</Button>
                            </td>

                        </tr>
                        <tr>
                            <td height="75">
                                <Button
                                    className={this.getStyle(2,"C")}
                                    variant={this.getVariant(2,"C")}
                                    onClick={()=>this.set(2,"C")}> {decodeURIComponent(this.props.questions[2])}</Button>
                            </td>
                            <td height="75">
                                <Button
                                    className={this.getStyle(3,"D")}
                                    variant={this.getVariant(3,"D")}
                                    onClick={()=>this.set(3,"D")}> {decodeURIComponent(this.props.questions[3])}</Button>
                            </td>
                        </tr>

                    </tbody>
                    </table>

        )
    }
}

export default MCBlock;
