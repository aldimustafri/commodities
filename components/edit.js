/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  Button, Modal, Form, Upload, Icon, Input, Select, InputNumber
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

function edit(props) {
  useEffect(() => {
    setData(props.currentData)
  }, [props])

  const [form] = Form.useForm();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const [getProvince, setProvince] = useState();
  const [getData, setData] = useState(props.currentData);


  const handleCity = (index) => {
    setProvince(props.area.filter(item => item.city === index))
  }

  const onCreate = async (values) => {
    setVisible(false);
    const getdate = new Date();

    const dataValue = {
      uuid:  getData.uuid,
      komoditas: values.komoditas || getData.komoditas,
      area_provinsi: values.area_provinsi || getData.area_provinsi,
      area_kota: values.area_kota || getData.area_kota,
      size: values.size || getData.size,
      price: values.price || getData.price,
      tgl_parsed: getdate.toLocaleString(),
      timestamp: getdate.getTime()
    }


    setData({ ...getData }, props.updateData(dataValue))
  };


  const CreateForm = ({
    onCreate, onCancel
  }) => {
    return (
      <Modal
        visible={visible}
        title="Update Data"
        okText="Update"
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
        <Form form={form} layout="vertical">

          <Form.Item
            label="Komoditas"
            name="komoditas"
          >
            <Input
              placeholder="nama komoditas"
              autoComplete="off"
              defaultValue={getData.komoditas}
            />
          </Form.Item>

          <Form.Item
            name="area_kota"
            label="Kota"
          >
            <Select style={{ display: "flex" }} placeholder="pilih kota" onChange={handleCity} defaultValue={getData.area_kota}>
              {props.area.map((item) => (
                <Option value={item.city} key={uuidv4()}>{item.city}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Provinsi"
            name="province"
          >
            <Input
              defaultValue={getProvince ? getProvince[0].province : getData.area_provinsi}
              autoComplete="off"
              disabled
            />
          </Form.Item>


          <Form.Item
            name="size"
            label="Size"
          >
            <Select style={{ display: "flex" }} placeholder="pilih size" defaultValue={getData.size}>
              {props.size.map((item) => (
                <Option value={item.size} key={uuidv4()}>{item.size}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
          >
            <InputNumber
              placeholder="jumlah harga"
              autoComplete="off"
              min={1}
              style={{ width: 300 }}
              defaultValue={getData.price}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
          props.editData(props.initialData)
        }}
      >
        Edit
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

export default edit
