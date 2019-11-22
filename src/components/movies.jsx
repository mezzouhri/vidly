import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    this.setState({
      movies: this.state.movies.filter(m => m._id !== movie._id)
    });
  };

  handeLike = movie => {
    movie.isLiked = !movie.isLiked;
    this.setState({ ...this.state });
  };

  render() {
    const { movies } = this.state;
    const { length: count } = movies;
    if (count === 0) return <p>There are no movies in the database</p>;

    return (
      <React.Fragment>
        <p>Showing {movies.length} movies in the database :</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    isLiked={movie.isLiked}
                    onClick={() => this.handeLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
