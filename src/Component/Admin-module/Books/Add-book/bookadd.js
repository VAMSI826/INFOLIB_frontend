import React from "react";
import "./bookadd.css";
import Box from "@mui/material/Box";
import Sidebar from "../../Sidebar/sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


export default function Bookadd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const bookInfo = {
      title: data.title,
      barcode: data.barcode,
      author: data.author,
      publication: data.publication,
      imagelink: data.imagelink,
      copies: data.copies,
      edition: data.edition,
      category: data.category,
    };
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/book/addbook`, bookInfo)
      .then((res) => {
        if (res.data) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, m: -10 }}>
        <div className="full-book">
          <section class="bg-image">
            <div class="container">
              <header>
                <b>ADD A BOOK</b>
              </header>
              <p>Enter the following details to add a book to your library</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                class="form"
                id="bookform"
              >
                <div class="input-box column">
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    id="title"
                    {...register("title", { required: true })}
                  />
                  <input
                    type="text"
                    name="barcode"
                    id="barcode"
                    placeholder="Barcode"
                    {...register("barcode", { required: true })}
                  />
                </div>
                <div class=" input-box column">
                  <input
                    type="text"
                    name="author"
                    id="author"
                    placeholder="Author"
                    {...register("author", { required: true })}
                  />
                  <input
                    type="text"
                    name="publication"
                    placeholder="Publication"
                    {...register("publication", { required: true })}
                  />
                </div>
                <div class=" input-box column">
                  <input
                    type="url"
                    name="imagelink"
                    id="imagelink"
                    placeholder="Image Link"
                    {...register("imagelink", { required: true })}
                  />
                  <input
                    type="number"
                    name="copies"
                    id="copies"
                    placeholder="No of availabe copies"
                    {...register("copies", { required: true })}
                  />
                </div>
                <div class="column input-box">
                  <input
                    type="text"
                    name="edition"
                    id="edition"
                    placeholder="Edition"
                    {...register("edition", { required: true })}
                  />
                  <div class="select-box">
                    <select {...register("category", { required: true })}>
                      <option hidden value="category">
                        Category
                      </option>
                      <option value="BCA">BCA </option>
                      <option value="Bcom">BCom </option>
                      <option value="BA">BA </option>
                      <option value="BBA">BBA </option>
                      <option value="BSc">BSc </option>
                    </select>
                  </div>
                </div>
                <div class="column">
                  <button type="submit">Submit</button>
                  <button type="reset"> Reset</button>
                </div>
              </form>
            </div>
          </section>
        </div>
        <Toaster />
      </Box>
    </Box>
  );
}
