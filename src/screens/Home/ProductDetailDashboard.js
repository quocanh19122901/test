import {
  Box,
  Button,
  Container,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
export default function ProductDetailDashboard() {
  let params = useParams();

  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [desc, setDesc] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [price, setPrice] = useState([]);
  const navigate = useNavigate();

  const handleAccept = async () => {
    const requestOptions = {
      headers: { "Content-Type": "application/json" },
    };
    const updatedData = {
      title: data.title,
      productName: data.productName,
      desc: data.desc,
      price: data.price,
      avatar: data.avatar,
    };
    axios
      .put(
        `http://localhost:5000/api/products/${params.id}`,
        updatedData,
        requestOptions
      )
      .then((response) => {
        toast.success("Cập nhật thành công");
        setData(response.data);
        console.log(response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${params.id}`)
      .then((response) => {
        setData(response.data);
        setDesc(response.data.desc);
        setAvatar(response.data.avatar);
        setPrice(response.data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData]);
  const handleProductNameChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      productName: event.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      avatar: event.target.value,
    }));
  };

  const handleDescChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      desc: event.target.value,
    }));
  };

  const handlePriceChange = (event) => {
    setData((prevData) => ({
      ...prevData,
      price: event.target.value,
    }));
  };

  return (
    <Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>
              <TextField
                value={data.productName}
                onChange={(event) => handleProductNameChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mô tả</TableCell>
            <TableCell>
              <TextField
                value={data.desc}
                onChange={(event) => handleDescChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>
              <TextField
                value={data.avatar}
                onChange={(event) => handleAvatarChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Giá</TableCell>
            <TableCell>
              <TextField
                value={data.price}
                onChange={(event) => handlePriceChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Link to={`/home`}>
        <Button>Return</Button>
      </Link>
      <Button onClick={handleAccept}>Cập nhật</Button>
    </Container>
  );
}
