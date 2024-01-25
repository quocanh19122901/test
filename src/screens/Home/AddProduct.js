import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [price, setPrice] = useState([]);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  const token = getCookie("access_Token");
  const handleAccept = async () => {
    axios
      .post(`http://localhost:5000/api/products`, {
        title: title,
        productName: name,
        desc: desc,
        avatar: avatar,
        price: price,
      })
      .then((response) => {
        toast.success("Thêm sản phẩm thành công");
        setData(response.data);
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Vui lòng điền đầy đủ thông tin");
      });
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleProductNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };
  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleTitleChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tên sản phẩm</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleProductNameChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mô tả</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleDescChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ảnh</TableCell>
            <TableCell>
              <TextField
                onChange={(event) => handleAvatarChange(event)}
                fullWidth
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Giá</TableCell>
            <TableCell>
              <TextField
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
      <Button onClick={handleAccept}>Add</Button>
    </Container>
  );
}
