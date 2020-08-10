import React, {Component} from "react";

import Button from "react-bootstrap/Button";


class TFBlock extends Component {
    constructor(props) {
        super(props);
        this.state={
            selected: null
        }}

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.questions !== this.props.questions) {
            this.setState({selected: null})
        }}

    set(value, choice) {
        if (!this.props.answerDisplay) {
            this.props.answerCallback(value);
            this.setState({selected: choice})
        }
    }

    getVariant(id,letter){
        //buttons tracked by text(correct answer) and letter (selected)
        const correctA = this.props.correctAnswer;
        const buttonText = id;
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
        const buttonText = id;
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
                    <td height="80">
                        <Button
                            className={this.getStyle("True","A")}
                            variant={this.getVariant("True","A")}
                            onClick={()=>this.set("True","A")}><h2>True</h2>  </Button>
                    </td>
                    <td height="80">
                        <Button
                            className={this.getStyle("False","B")}
                            variant={this.getVariant("False","B")}
                            onClick={()=>this.set("False","B")}><h2>False</h2></Button>
                    </td>

                </tr>

                </tbody>
            </table>

        )
    }
}

export default TFBlock;