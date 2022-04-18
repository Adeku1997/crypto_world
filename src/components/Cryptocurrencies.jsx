import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";

const Cryptocurrencies = ({ limit }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state.stat.stats);
  const coins = data?.data?.coins;

  // useEffect(() => {
  //   const filteredData = coins?.filter((coin) =>
  //     coin.name.toLowerCase().includes(searchTerm.toLowerCase)
  //   );
  //   console.log(filteredData);
  // }, [searchTerm]);

  return (
    <>
      {!limit && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div>
        <Row gutter={[32, 32]} className="crypto-card-container">
          {coins
            ?.slice(0, limit || coins.length)
            .filter((coin) =>
              coin.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((coin, index) => (
              <Col xs={24} sm={12} lg={6} className="crypto-card" key={index}>
                <Link to={`/crypto/${coin.uuid}`}>
                  <Card
                    title={`${coin.rank}.${coin.name}`}
                    extra={<img className="crypto-image" src={coin.iconUrl} />}
                    hoverable
                  >
                    <p>Price:{millify(coin.price)}</p>
                    <p>Market Cap:{millify(coin.marketCap)}</p>
                    <p>Daily Change:{millify(coin.change)}%</p>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </div>
    </>
  );
};

export default Cryptocurrencies;
