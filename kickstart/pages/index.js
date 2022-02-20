import React, { Component } from "react";
import factory from "../ethereum/factory";

import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

import { Link } from "../routes";

import Script from "next/script";

export class index extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link to={`/campaigns/${address}`}>
            <a>View Campaigns</a>
          </Link>
        ),
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <Script id="my_script">
          alert( 'This website includes\n 1.Connect Wallet\n 2.Create Campaign\n
          3.View Campaign\n 4.view manager of campaign\n 5.View requests and
          approve requests\n 6.send money to campaign manager \n Note:- NextJs
          and solidity is used to create this Dapp' )
        </Script>
        <div>
          <h3>Open Campaigns</h3>
          <Link to="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default index;
