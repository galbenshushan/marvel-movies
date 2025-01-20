import styled from "styled-components";
import { MovieType } from "../types/api";
import { formatDateToText } from "../utils/Date";

const TinyCardContainer = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  padding: 8px;
  color: #ffffff;
  width: 250px;
  margin-bottom: 12px;
`;

const TinyCardImage = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 12px;
`;

const TinyCardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TinyCardTitle = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
`;

const TinyCardMetaText = styled.p`
  font-size: 0.75rem;
  color: #b3b3b3;
  margin: 4px 0 0 0;
`;

interface TinyMovieCardProps {
  movie: MovieType;
}

const TinyMovieCard: React.FC<TinyMovieCardProps> = ({ movie }) => {
  const formattedDate = movie.release_date
    ? formatDateToText(movie.release_date)
    : "N/A";

  return (
    <TinyCardContainer>
      <TinyCardImage
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />
      <TinyCardContent>
        <TinyCardTitle>{movie.title}</TinyCardTitle>
        <TinyCardMetaText>Release Date: {formattedDate}</TinyCardMetaText>
      </TinyCardContent>
    </TinyCardContainer>
  );
};

export default TinyMovieCard;
