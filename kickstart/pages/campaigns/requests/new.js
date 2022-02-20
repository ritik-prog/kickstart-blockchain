import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";

export default class RequestNew extends Component {
  static getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }
  state = {
    description: "",
    value: "",
    recipient: "",
    message: "",
    loading: false,
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(this.props.address);
    const { description, value, recipient } = this.state;

    try {
      this.setState({ message: "", loading: true });

      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0],
        });
      Router.pushRoute(`campaigns/${this.props.address}/requests`);
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ message: error.message, loading: false });
    }
  };

  render() {
    return (
      <Layout>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.message}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={this.state.recipient}
              onChange={(e) => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.message} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
          <Link route={`/campaigns/${this.props.address}/requests`}>
            <a>
              <Button primary>Back</Button>
            </a>
          </Link>
        </Form>
      </Layout>
    );
  }
}
