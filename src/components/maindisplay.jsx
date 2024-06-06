import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";
import exampleData from "../assets/example_data.json";
import { Carousel } from "primereact/carousel";
import { Paginator } from "primereact/paginator";
export default function MainDisplay() {
  const defaultData = exampleData;
  const today = new Date();
  const days = today.getDay();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [tempData,setTempData] = useState(defaultData);
  const [data, setData] = useState(tempData.slice(first, first + 9));
  const [searchText,setSearchText] = useState('');
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const categories = [
    { name: "restaurant" },
    { name: "bakery" },
    { name: "cafe" },
  ];

  const itemTemplate = (image) => {
    return (
      <img
        style={{ maxHeight: "100px", maxWidth: "100px" }}
        src={image}
        alt={image}
      />
    );
  };

  const cardContent = (item) => {
    const images = item.images;
    return (
      <>
        <Card
          pt={{ content: { style: {padding:'0px 0px'} } }}
          key={item.id}
          style={{ maxWidth: "30vw", height: "100%" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: "50px",
            }}
          >
            <img
              style={{ width: "50px", height: "100%", display: "inline" }}
              src={item.profile_image_url}
            ></img>
            <div>
              <p style={{ display: "block", margin: "0px" }}>{item.name}</p>
              <p>
                {item.operation_time[days].time_open} -{" "}
                {item.operation_time[days].time_close}
              </p>
            </div>
          </div>
          <Carousel
            style={{ marginTop: "1rem" }}
            value={images}
            numVisible={3}
            numScroll={1}
            responsiveOptions={responsiveOptions}
            itemTemplate={itemTemplate}
            pt={{
              indicator: { style: { display: "none" } },
              item: {
                style: { width: "100%", height: "100%", objectFit: "cover" },
              },
              itemsContent:{
                style:{display:'flex',justifyContent:'center',height:'100%',alignItems:'center'}
              }
            }}
          />
        </Card>
      </>
    );
  };

  const onPageChange = (event) => {
    console.log("asdfasdf", event.first);
    setFirst(event.first);
    setRows(event.rows);
    setData(tempData.slice(event.first, event.first + 9));
  };


  function onSelectedRestaurant(value){
    const data =  defaultData.filter((item)=> item.categories.includes(value.name))
    setFirst(0)
    setTempData(data)
    setData(data.slice(0,9))
    setSelectedRestaurant(value)
  }


  function onSearchByName(value){
    setSearchText(value)
  }
  return (
    <div style={{ padding: "20px 20px", minWidth: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Place List</p>

        <div style={{ display: "flex" }}>
          <Dropdown
            value={selectedRestaurant}
            onChange={(e) => onSelectedRestaurant(e.value)}
            options={categories}
            optionLabel="name"
            placeholder="Select a Restaurant"
            pt={{ root: { style: { display: "flex", alignItems: "center" } } }}
            style={{ borderRadius: "30px", minWidth: "15rem" }}
          />

          <Divider layout="vertical" />
          <InputText
            value={searchText}
            placeholder="Search Name"
            style={{ borderRadius: "30px" }}
            onChange={(e)=>onSearchByName(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "20px",
          height: "70vh",
          overflowY: "auto",
          marginTop: "20px",
        }}
      >
        {data.map((item) => cardContent(item))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={tempData.length}
        onPageChange={onPageChange}
      />
    </div>
  );
}
