/**
 * Created by jay on 3/31/17.
 */
import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }
    }

    onSubmit(e) {
        //const url = this.refs.url.value.trim();
        //const url = this.state.url;
        const { url } = this.state;
        e.preventDefault();
        if(url) {
            //Links.insert({url, userId: Meteor.userId()}); //userId will be used in publish() ==> this.userId()
            //can't insert after removing Meteor insecure package
            //console.log('userid on sumbit', this.userId);
            Meteor.call('links.insert', url, (err, res) => {
                if (!err) {
                    this.handleModalClose();
                } else {
                    this.setState({error: err.reason});
                }
            });
        }
    }

    onURLChange(e) {
        this.setState({url: e.target.value.trim()});
    }

    handleModalClose() {
        this.setState({isOpen: false, url: '', error: ''});
    }

    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={() => this.handleModalClose()}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add Link Here</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form onClick={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="url"
                            placeholder="URL"
                            value={this.state.url}
                            onChange={this.onURLChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                        <button type="button" onClick={this.handleModalClose.bind(this)} className="button button--secondary">Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}
