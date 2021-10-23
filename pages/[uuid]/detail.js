/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Card, Row, List, PageHeader, Col, Tag } from 'antd';
import dateFormat from '../../libs/DateFormat';
import CurrencyFormatter from "../../libs/CurrencyFormatter";
import DollarFormatter from "../../libs/DollarFormatter";
import { useRouter } from 'next/router'

function detail({ listData, valuation }) {
  console.log('valuation: ', valuation)
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Details | Commodity Resources | by Aldi Mustafri</title>
        <meta name="description" content="Commodity Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader
        className="pageStyle"
        onBack={() => router.back()}
        title="Commodity Resources"
        tags={<Tag color="blue">{`${valuation.komoditas} Details`}</Tag>}
      />

      <br />
      <Row className="rowstyle">
        <Card className="pageStyle2">
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Summary"
          >
            <Row gutter={16}>
              {valuation.min_price === valuation.max_price ? (
                <Col span={6}>
                  <Card title="Price" bordered={false}>
                    {valuation.min_price}
                  </Card>
                </Col>
              ) : (
                <>
                  <Col span={6}>
                    <Card title="Min Price" bordered={false}>
                      {valuation.min_price}
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card title="Max Price" bordered={false}>
                      {valuation.max_price}
                    </Card>
                  </Col>
                </>
              )}

              {valuation.min_size === valuation.max_size ? (
                <Col span={6}>
                  <Card title="Size" bordered={false}>
                    {valuation.min_size}
                  </Card>
                </Col>
              ) : (
                <>
                  <Col span={6}>
                    <Card title="Min Size" bordered={false}>
                      {valuation.min_size}
                    </Card>
                  </Col>
                  <Col span={6}>
                    <Card title="Max Size" bordered={false}>
                      {valuation.max_size}
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </Card>
        </Card>
      </Row>

      <br/>

      <Row className="rowstyle">
        <Card className="pageStyle2">
          {listData.map((item, index) => (<Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Details"
            key={index}
          >
            <List.Item>komoditas: {item.komoditas}</List.Item>
            <List.Item> Area Kota: {item.area_kota}</List.Item>
            <List.Item> Area Provinsi: {item.area_provinsi}</List.Item>
            <List.Item>Harga: {CurrencyFormatter(item.price)}</List.Item>
            <List.Item>Harga dalam USD: {DollarFormatter(item.price)}</List.Item>
            <List.Item>Size: {item.size}</List.Item>
            <List.Item>Tanggal: {dateFormat(item.tgl_parsed, 'date')}</List.Item>
          </Card>))}
        </Card>
      </Row>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  try {
    const list = await fetch(`${process.env.RESTURL_LOCAL_SERVER}/api/${query.uuid}/detail`);

    const listData = await list.json();

    const valuationData = await fetch(`${process.env.RESTURL_LOCAL_SERVER}/api/${listData.map((item) => item.komoditas)}/valuation`);
    const valuation = await valuationData.json();

    return { props: { listData, valuation } };
  } catch (error) {
    return { props: { listData: null } };
  }
}

export default detail
