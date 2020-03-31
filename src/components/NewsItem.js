import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
    margin-bottom: 2rm;
    overflow: hidden;

    .tunmbnail {
        margin-right : 1rem;
        float : left;
        width : 160px;
        height : 100px;
        background-image : url(${props => props.urlToImage});
        background-position : center;
        background-size : cover;
        background-repeat : no-repeat;
    }

    .contents {
        .title {
            margin-top : 0.5rem;
            margin-bottom : 1rem;

            a {
                color : inherit;
                text-decoration: none;
            }
        }
        .description {
            line-height : 1.3;
        }
    }


`;



const NewsItem = ({ article }) => {
    const { title, description, url, urlToImage } = article;
    return (
        <NewsItemBlock urlToImage={urlToImage} color="blue">
            {urlToImage && <div className="tunmbnail"></div>}
            <div className="contents">
                <h3 className="title">
                    <a href={url}>{title}</a>
                </h3>
                <div className="description">{description}</div>
            </div>
        </NewsItemBlock>
    );
};

export default NewsItem;