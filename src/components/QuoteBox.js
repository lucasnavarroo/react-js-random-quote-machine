import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Link from "@material-ui/core/Link";

const quotesUrl =
  "https://gist.githubusercontent.com/AbhishekChd/ab9949b618fcbf58ac84f9c8e88d6688/raw/90916f0d09a295eb5b2eea6c29a648e8c60b0e6f/5769a491e4b01190df7a9a70.json";

const style = {
  box: { padding: "40px" }
};

export default class QuoteBox extends Component {
  state = {
    quote: "",
    author: ""
  };

  componentDidMount() {
    this.getRandomQuote();
  }

  getRandomQuote = async res => {
    axios
    .get(quotesUrl)
    .then(res => {
      const randomPos = Math.floor(Math.random() * res.data.length);
      const quote = res.data[randomPos].content;
        const author = res.data[randomPos].author;
        this.setState({
          quote: quote,
          author: author
        });
      })
      .then(() => {
        console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
          <Paper style={style.box} elevation={4} id="quote-box">
            <Typography align="center" variant="h5" gutterBottom id="text">
              {this.state.quote}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
              id="author"
            >
              {this.state.author}
            </Typography>
            <Button>
              <Link href={`https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}`} target="_blank" underline="none" color="inherit" id="tweet-quote">
                TWEET QUOTE
              </Link>
            </Button>
            <Button id="new-quote" onClick={this.getRandomQuote}>
              new quote
            </Button>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
