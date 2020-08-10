import Container from "react-bootstrap/Container";
import {Formik} from "formik";
import React, {Component} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class EditProfile extends Component {
    constructor(props) {
        super(props);
    }

    postData(values) {
        let token = this.props.token;
        const requestUrl = "https://klingons.pythonanywhere.com/api/v1/profile/" + this.props.id + "/";
        let response = fetch(requestUrl, {
            method: "PATCH",
            dataType: "JSON",
            headers: {
                "Authorization": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "bio": values.bio,
                "location": values.local
            })
        })
            .then((resp) => {
                return resp.json();
            })
            .then((resp) => {
                console.log(resp)
                this.props.update(resp)
            })
            .catch((error) => {
                console.log(error, "catch the hoop")
            });
    }

    render() {
        return (

            <Container style={{width: "300px"}}>
                <Formik initialValues={{
                    local: this.props.local,
                    bio: this.props.bio
                }}
                        onSubmit={(values, {setSubmitting, resetForm}) => {
                            // When button submits form and form is in the process of submitting, submit button is disabled
                            setSubmitting(true);
                            resetForm();
                            this.postData(values);
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 500);
                        }}
                >
                    {({values, handleChange, handleSubmit, isSubmitting}) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="local">
                                <Form.Label>Location:</Form.Label>
                                <Form.Control
                                    name="local"
                                    maxLength="30"
                                    placeholder={this.props.local}
                                    onChange={handleChange}
                                    value={values.local}
                                />
                            </Form.Group>
                            <Form.Group controlId="bio">
                                <Form.Label>Bio:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="6"
                                    maxLength="400"
                                    placeholder={this.props.bio}
                                    onChange={handleChange}
                                    value={values.bio}
                                />
                            </Form.Group>
                            <Button
                                type={"submit"}
                                disabled={isSubmitting}
                            >Submit Changes</Button>
                        </Form>
                    )}

                </Formik>
            </Container>
        )
    }
}

export default EditProfile;