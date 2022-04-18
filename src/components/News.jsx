import React, { useState, useEffect } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews } from "../Redux/news/newsActions";
import Loader from "./Loader";


const { Text, Title } = Typography;
const { Option } = Select;

const demoImg =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fuk-scotland-57268024&psig=AOvVaw2VusdEufBrZxfMf6wha4Y2&ust=1649520603733000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCJjdzJ_thPcCFQAAAAAdAAAAABAD";

const News = ({ limit }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const data = useSelector((state) => state.news.news);
  const loading = useSelector((state) => state.news.loading);

  const Cryptocurrencies = useSelector((state) => state.stat.stats);
  const coins = Cryptocurrencies?.data?.coins;

  const dispatch = useDispatch();

  const cryptoNews = data?.value;


  useEffect(() => {

    dispatch(fetchNews(newsCategory));
  }, [newsCategory]);

  if (loading) return <Loader/>;



  return (
    <Row gutter={[24, 24]}>
      {!limit && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="select a news crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <option value="Cryprocurrency">Cryptocurrency</option>
            {coins?.map((coin)=><option value={coin.name}>{coin.name}</option>)}
          </Select>
        </Col>
      )}
      {cryptoNews?.slice(0, limit || cryptoNews.length).map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={news?.image?.thumbnail?.contentUrl || demoImg}
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl || demoImg
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
