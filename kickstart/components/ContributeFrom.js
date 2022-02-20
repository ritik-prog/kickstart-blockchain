import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

export default class ContributeFrom extends Component {
  state = {
    value: "",
    message: "",
    loading: false,
  };
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true,message:'' });
    const campaign = Campaign(this.props.address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
      this.setState({ loading: false, message: "" });
    } catch (error) {
      this.setState({ message: error.message });
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.message}>
        <Form.Field>
          <label>Amount To Contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.message} />

        <Button loading={this.state.loading} primary>
          Contribute!
        </Button>
      </Form>
    );
  }
}
