import React, { useState } from "react";
import { FaHeart, FaRegComment } from "react-icons/fa";
import styled from "styled-components";
import colorScheme from "../utils/colorScheme"; // Make sure to import the colorScheme

const Card = ({ scheme = "primary" }) => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  // Get the color scheme from colorScheme.js
  const colors = colorScheme[scheme] || colorScheme.primary;

  return (
    <StyledWrapper colors={colors}>
      <div className="post-card">
        <div className="avatar" />
        <a href="#" className="title">
          7 Tools for Faster Development in React
        </a>
        <span className="datetime">3 min to read</span>
        <div className="image-preview" />
        <div className="comment-like">
          <span onClick={handleLike} className="like-button">
            <FaHeart className={`like-icon ${likes > 0 ? 'liked' : ''}`} />
            {likes > 0 && likes}
          </span>
          <span className="comment-button">
            <FaRegComment className="comment-icon" />
            4
          </span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .post-card {
    width: 320px;
    background: lightgrey;
    background-color: rgb(24 27 32);
    border: 1px solid rgb(84 90 106);
    border-radius: 20px;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
  }

  .avatar {
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background-color: blueviolet;
    background-image: linear-gradient(to top left, blueviolet, rgb(73, 31, 112));
  }

  .title {
    font-size: 20px;
    line-height: 22px;
    font-weight: 600;
    margin-top: 10px;
    color: #fff;
    text-decoration: none;
    transition: all 0.35s ease-in;
  }

  .title:hover {
    text-decoration: underline blueviolet;
  }

  .datetime {
    font-size: 12px;
    color: rgb(168 179 207);
    margin: 10px 0;
  }

  .image-preview {
    flex: 1;
    min-height: 150px;
    width: 100%;
    border-radius: 20px;
    background-color: blueviolet;
    background-image: linear-gradient(to top left, blueviolet, rgb(73, 31, 112));
    margin-bottom: 4px;
  }

  .comment-like {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2px 0;
  }

  .like-button, .comment-button {
    cursor: pointer;
    height: 40px;
    width: 50px;
    padding: 0 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
    border-radius: 10px;
    background-color: transparent;
    transition: all 0.15s ease;
    color: #fff;
  }

  .like-button:hover {
    background-color: rgba(255, 0, 0, 0.1);
  }

  .like-icon {
    margin-right: 2px;
    color: gray; /* Default color */
  }

  .like-icon.liked {
    color: red; /* Color when liked */
  }

  .comment-icon {
    color: #fff;
    margin-right: 2px;
  }
`;

export default Card;
