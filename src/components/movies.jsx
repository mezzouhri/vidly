import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import { getMovies, deleteMovie } from "../services/movieService";
import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
    selectedGenre: null
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const { data: movies } = await getMovies();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    this.setState({
      movies,
      genres,
      selectedGenre: genres[0]
    });
  }

  handleDelete = async movie => {
    const { movies, pageSize, currentPage } = this.state;
    const originalMovies = movies;
    const newMovies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({
      movies: newMovies,
      currentPage:
        Math.ceil(newMovies.length / pageSize) < currentPage
          ? this.state.currentPage - 1
          : this.state.currentPage
    });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie has already deleted.");

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    movie.isLiked = !movie.isLiked;
    this.setState({ ...this.state });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ searchQuery: "", selectedGenre: genre, currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedGenre: {},
      currentPage: 1
    });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    let filtred =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    if (searchQuery) {
      filtred = allMovies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtred, sortColumn.path, sortColumn.order);
    const movies = paginate(sorted, currentPage, pageSize);
    return { filtred, movies };
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery
    } = this.state;

    const { filtred, movies } = this.getPagedData();

    const { length: count } = filtred;
    if (allMovies.length === 0)
      return <p>There are no movies in the database</p>;
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {this.props.user && (
            <Link to="/movies/new">
              <button className="btn btn-primary mb-3">New Movie</button>
            </Link>
          )}
          <p>Showing {count} movies in the database :</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            user={this.props.user}
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
