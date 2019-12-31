import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", rate: "" },
    genres: [],
    errors: {}
  };

  componentDidMount() {
    this.setState({ genres: getGenres() });
  }

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    rate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate")
  };

  doSubmit = () => {
    //call server
    console.log("Submitted Register");
  };

  render() {
    const { match, history } = this.props;
    const { data, genres } = this.state;
    console.log(data.genre);
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
