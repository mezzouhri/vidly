import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {}
  };

  componentDidMount() {
    const data = {};
    data.genre = getGenres();
    this.setState({ data });
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(1000)
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
    const { data } = this.state;
    console.log(data.genre);
    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {/* <label htmlFor="selectGenre">Genre</label>
          <select
            className="custom-select"
            id="selectGenre"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {data.genre.map(g => (
              <option key={g._id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select> */}

          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>

        {/* <button
          className="btn btn-primary"
          onClick={() => history.replace("/movies")}
        >
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;
