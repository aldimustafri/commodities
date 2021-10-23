/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from "react";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import dateFormat from '../libs/DateFormat'
import EditComponent from './edit';
import Link from 'next/link';
import CurrencyFormatter from "../libs/CurrencyFormatter";

function table({ dataList, deleteData, area, size, currentData, updateData, editData }) {
  dataList && dataList.map((item) => item.tgl_parsed = dateFormat(item.tgl_parsed, "date"));

  const [, setSearchText] = useState("");
  const [, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({

    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>

          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),

    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),

    onFilter: (value, record) => (record[dataIndex]
      ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
      : ""),

    onFilterDropdownVisibleChange: (visible) => {
      if (visible) { setTimeout(() => searchInput.current.select(), 100); }
    },

    render: (text) => text,
  });

  const columns = [
    {
      title: 'Komoditas',
      dataIndex: 'komoditas',
      item: ['uuid'],
      key: 'komoditas',
      ...getColumnSearchProps("komoditas"),
      render: (text, item) => {
        return (
          <Link href="/[uuid]/detail" as={`/${item.uuid}/detail`}>{text}</Link>
        )
      },
    },
    {
      title: 'Provinsi',
      dataIndex: 'area_provinsi',
      key: 'area_provinsi',
      ...getColumnSearchProps("area_provinsi"),

    },
    {
      title: 'Kota',
      dataIndex: 'area_kota',
      key: 'area_kota',
      ...getColumnSearchProps("area_kota"),

    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Harga',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (text) => (CurrencyFormatter(text))
    },
    {
      title: 'Tanggal',
      dataIndex: 'tgl_parsed',
      key: 'tgl_parsed',
    },
    {
      title: 'Action',
      dataIndex: "uuid",
      initialData: ["uuid", "komoditas", "area_provinsi", "area_kota", "size", "price", "tgl_parsed", "timestamp"],
      key: 'action',
      render: (record, initialData) => {
        return (
          (
            <Space size="middle">
              <Button onClick={() => deleteData(record)}> <a>Delete</a></Button>
              <EditComponent area={area} size={size} currentData={currentData} updateData={updateData} initialData={initialData} editData={editData} />
            </Space>
          )
        )
      }
    },
  ];


  return (
    <div>
      <Table columns={columns} dataSource={dataList} rowKey='uuid' />
    </div>
  )
}

export default table
