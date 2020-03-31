import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import NewsItem from './NewsItem';


const NewsListBlock = styled.div`
    padding-bottom : 3rem;
    width : 960px;
    margin : 0 auto;
`;


// api 요청할때에 요청을 시작하면 loading을 true 응답후 false
// 이래야 ui단에서 로딩중인지 아닌지 판단가능

// map 할때 신경쓸 부분은 !articles 를 먼저 조회해야됨 
// 조회를 하지 않는다면 데이터가 없을때 null 에는 .map 함수가 없기때문에 크래쉬될수 있다.
class NewsList extends Component {
    state = {
        loading: false,
        articles: null
    };

    loadData = async () => {
        try {
            this.setState({
                loading: true
            });

            const { category } = this.props;
            const query = category === 'all' ? '' : `&category=${category}`;

            const response = await axios.get(`http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=7eaede05f65e4002b165f0f65e1a0c47`)
            console.log(response)
            this.setState({
                articles: response.data.articles
            })
        } catch (e) {
            console.log(e)
        }

        this.setState({
            loading: false
        });
    }
    //api 요청시 사용
    componentDidMount() {
        this.loadData()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.category !== this.props.category) this.loadData();
    }
    render() {
        const { articles, loading } = this.state;
        if (!articles || loading)
            return <NewsListBlock>로딩중...</NewsListBlock>
        return (
            <NewsListBlock>
                {articles.map(article => (
                    <NewsItem key={article.url} article={article}></NewsItem>
                ))}
            </NewsListBlock>
        );
    }
}

export default NewsList;