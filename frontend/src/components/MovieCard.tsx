import React from "react";
import styled from "styled-components";
import { MovieType } from "../types/api";
import { formatDateToText } from "../utils/Date";
import { getGenreName } from "../utils/Genres";

const CardContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #ffffff;
  width: 300px;
`;

const CardImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
`;

const CardText = styled.p`
  font-size: 0.875rem;
  color: #b3b3b3;
  margin: 0;
`;

const MetaText = styled.p`
  font-size: 0.875rem;
  color: #f2f2f2;
  margin: 0;
`;

const GenreContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const GenreChip = styled.span`
  padding: 4px 8px;
  background-color: #f46d24;
  border-radius: 12px;
  font-size: 12px;
  color: #ffffff;
  font-weight: bold;
`;

interface MovieCardProps {
  movie: MovieType;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const genres = movie.genre_ids.map(getGenreName);
  const formattedDate = formatDateToText(movie.release_date);
  return (
    <CardContainer>
      <CardImage
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.title}
        loading="lazy"
      />
      <CardContent>
        <CardTitle>{movie.title}</CardTitle>
        <CardText>
          {movie.overview.length > 100
            ? `${movie.overview.slice(0, 100)}...`
            : movie.overview}
        </CardText>
        <MetaText>Release Date: {formattedDate}</MetaText>
        <MetaText>Popularity: {movie.popularity}</MetaText>
        <MetaText>Rating: {movie.vote_average}</MetaText>
        <GenreContainer>
          {genres.map((genre, index) => (
            <GenreChip key={index}>{genre}</GenreChip>
          ))}
        </GenreContainer>
      </CardContent>
    </CardContainer>
  );
};

export default MovieCard;
