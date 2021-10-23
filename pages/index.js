/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import Head from 'next/head';
import { Card, Row, PageHeader } from 'antd';
import AddComponent from '../components/add';
import TableComponent from "../components/table";
import { useRouter } from 'next/router'

function index({ list, area, size }) {
  const router = useRouter()
  const [dataList, setDataList] = useState(list)

  const addData = (item) => {
    setDataList([...dataList, item]);
  };

  const initialData = {
    uuid: null,
    komoditas: "",
    area_provinsi: "",
    area_kota: "",
    size: "",
    price: "",
    tgl_parsed: "",
    timestamp: ""
  };

  const [currentData, setCurrentData] = useState(initialData);

  const editData = (data) => {
    setCurrentData(data);
  };

  const updateData = (newData) => {
    setDataList(
      dataList.map((item) => (item.uuid === currentData.uuid ? newData : item))
    );
    setCurrentData(initialData);
  };


  const deleteData = (uuid) => {
    setDataList(dataList.filter((item) => item.uuid !== uuid));
  };

  return (
    <div>
      <Head>
        <title>Commodity Resources | by Aldi Mustafri</title>
        <meta name="description" content="Commodity Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeader
        className="pageStyle"
        title="Commodity Resources"
      />

      <Row className="rowstyle">
        <Card title="Commodity List" bordered={false}
          extra={<AddComponent addData={addData} area={area} size={size}/>}
        >
          <TableComponent dataList={dataList} deleteData={deleteData} area={area} size={size} currentData={currentData} updateData={updateData} editData={editData}/>
        </Card>
      </Row>
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    // res.setHeader(
    //   'Cache-Control',
    //   'public, s-maxage=10, stale-while-revalidate=59'
    // )

    const listData = await fetch(`${process.env.RESTURL_LOCAL_SERVER}/api/list`);
    const listArea = await fetch(`${process.env.RESTURL_LOCAL_SERVER}/api/area`);
    const listSize = await fetch(`${process.env.RESTURL_LOCAL_SERVER}/api/size`);

    const list = await listData.json();
    const area = await listArea.json();
    const size = await listSize.json();

    return { props: { list, area, size } };
  } catch (error) {
    return { props: { list: null } };
  }
}

export default index