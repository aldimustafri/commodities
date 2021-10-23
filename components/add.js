/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Button, Modal, Form, Upload, Icon, Input, Select, InputNumber
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function add(props) {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [getProvince, setProvince] = useState();
  const [getData, setData] = useState();

  const handleCity = (index) => {
    setProvince(props.area.filter(item => item.city === index))
  }

  const onCreate = async (values) => {
    setVisible(false);
    const getdate = new Date();

    const dataValue = {
      uuid: uuidv4(),
      komoditas: values.komoditas,
      area_provinsi: getProvince[0].province,
      area_kota: values.area_kota,
      size: values.size,
      price: values.price,
      tgl_parsed: getdate.toLocaleString(),
      timestamp: getdate.getTime()
    }

    setData({ ...getData}, props.addData(dataValue))
  };

  const CreateForm = ({
    onCreate, onCancel
  }) => {
    return (
      <Modal
        visible={visible}
        title="New Data"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            });
        }}
      >
        <Form form={form} layout="vertical" initialValues={{ modifier: "public" }}>

          <Form.Item
            label="Komoditas"
            name="komoditas"
            rules={[
              {
                required: true,
                message: "Mohon isi komoditas",
              },
            ]}
          >
            <Input
              placeholder="nama komoditas"
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            name="area_kota"
            label="Kota"
            rules={[
              {
                required: true,
                message: "Mohon pilih kota",
              },
            ]}
          >
            <Select style={{ display: "flex" }} placeholder="pilih kota" onChange={handleCity}>
              {props.area.map((item) => (
                <Option value={item.city} key={uuidv4()}>{item.city}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Provinsi"
            name="province"
          >
            {getProvince && <Input
              defaultValue={getProvince[0].province}
              autoComplete="off"
              disabled
            />}
          </Form.Item>


          <Form.Item
            name="size"
            label="Size"
            rules={[
              {
                required: true,
                message: "Mohon pilih size",
              },
            ]}
          >
            <Select style={{ display: "flex" }} placeholder="pilih size">
              {props.size.map((item) => (
                <Option value={item.size} key={uuidv4()}>{item.size}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Mohon isi jumlah harga",
              },
            ]}
          >
            <InputNumber
              placeholder="jumlah harga"
              autoComplete="off"
              min={1}
              style={{ width: 300 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };


  return (
    <div>
      <Button
        type="text"
        onClick={() => {
          setVisible(true);
        }}
        icon={<PlusOutlined />}
      >
        Create New Data
      </Button>

      <CreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  )
}

export default add
