import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import { fetchCrypto } from "../Redux/crypto-details/cryptoActions";
import parse from "html-react-parser";
import LineChart from "./LineChart";
import { fetchCoinHistory } from "../Redux/coin-history/coinHistoryActions";
import Loader from "./Loader";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.crypto.crypto);
  const loading = useSelector((state) => state.history.loading);
  
  const coinHistory = useSelector((state)=>state.history.coinHistory)

  const crypto = data?.data?.coin;
  // console.log('adeku',crypto);
  const description = crypto?.description;

  useEffect(() => {
    dispatch(fetchCrypto(coinId));
  }, [coinId]);

  useEffect(() => {
    dispatch(fetchCoinHistory(coinId,timePeriod));
  }, [timePeriod]);

  if (loading) return <Loader/>;
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${crypto?.price && crypto?.price}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: crypto?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${crypto?.volume && crypto?.volume}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${crypto?.marketCap && crypto?.marketCap}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        crypto?.allTimeHigh?.price && crypto?.allTimeHigh?.price
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: crypto?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: crypto?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: crypto?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${crypto?.supply?.total && crypto?.supply?.total}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        crypto?.supply?.circulating && crypto?.supply?.circulating
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {crypto?.name} ({crypto?.symbol}) price
        </Title>
        <p>
          {crypto?.name} live price in US dollars. view value statistics,market
          cap and supply
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="select time period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date) => (
          <option key={date}>{date}</option>
        ))}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={crypto?.price}
        coinName={crypto?.name}
      />
      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {crypto?.name} value statistics
            </Title>
            <p>An overview showing the statistics of {crypto?.name}</p>
          </Col>
          {stats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              other statistics
            </Title>
            <p>An overview showing the stats of all cryptocurrencies</p>
          </Col>
          {genericStats?.map(({ icon, title, value }) => (
            <Col className="coin-stats">
              <Col className="coin-stats-name">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </Col>
              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            what is {crypto?.name}
            {parse(`${description}`)}
          </Title>
        </Row>
        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {crypto?.name} Links
          </Title>
          {crypto?.links?.map((link) => (
            <Row className="coin-link" key={link?.name}>
              <Title level={5} className="link-name">
                {link?.type}
              </Title>
              <a href={link?.url} target="_blank" rel="noreferrer">
                {link?.name}
              </a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
