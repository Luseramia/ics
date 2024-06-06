import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import React, { useState, useEffect } from "react";
import exampleData from "../../assets/example_data.json";
import { Carousel } from "primereact/carousel";
import { Paginator } from "primereact/paginator";
import Detail from "./detail-store";
export default function Store() {
  const defaultData = exampleData;
  const today = new Date();
  const days = today.getDay();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(9);
  const [dataPlaceList, setDataPlaceList] = useState(defaultData);
  const [rowDataPlace, setRowDataPlace] = useState(
    dataPlaceList.slice(first, first + 9)
  );
  const [searchText, setSearchText] = useState("");
  const [dialog, setDialog] = useState(false);
  const [dataDialog, setDataDialog] = useState(null);

  const [columns, setColumns] = useState("1fr 1fr 1fr");

  useEffect(() => {
    const updateGridColumns = () => {
      if (window.innerWidth < 768) {
        setColumns("1fr");
      } else if (window.innerWidth < 1024) {
        setColumns("1fr 1fr");
      } else {
        setColumns("1fr 1fr 1fr");
      }
    };

    window.addEventListener("resize", updateGridColumns);
    updateGridColumns();

    return () => window.removeEventListener("resize", updateGridColumns);
  }, []);

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
          pt={{ content: { style: { padding: "0px 0px" } } }}
          key={item.id}
          style={{ height: "100%", width: "100%" }}
          onClick={() => {
            setDataDialog(item);
            setDialog(true);
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              columnGap: "50px",
            }}
          >
            <img
              style={{
                width: "50px",
                height: "50px",
                display: "inline",
                borderRadius: "10px",
              }}
              src={item.profile_image_url}
            ></img>
            <div>
              <p
                style={{ display: "block", margin: "0px", fontWeight: "bold" }}
              >
                {item.name}
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i
                    className="pi   pi-calendar"
                    style={{
                      fontSize: "1rem",
                      color: "black",
                      paddingRight: ".5rem",
                    }}
                  ></i>
                  <p style={{ fontSize: "14px" }}>
                    {item.operation_time[days].time_open} -{" "}
                    {item.operation_time[days].time_close}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#134B8A",
                  }}
                >
                  <i
                    className="pi pi-circle-fill"
                    style={{ fontSize: "1rem", paddingRight: ".5rem" }}
                  ></i>
                  <p>{item.rating}</p>
                </div>
              </div>
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
              indicators: { style: { padding: "0px 0px" } },
              indicator: { style: { display: "none" } },
            }}
          />
        </Card>
      </>
    );
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setRowDataPlace(dataPlaceList.slice(event.first, event.first + 9));
  };

  function onSelectedRestaurant(value) {
    const data = defaultData.filter((item) =>
      item.categories.includes(value.name)
    );
    setFirst(0);
    setDataPlaceList(data);
    setRowDataPlace(data.slice(0, 9));
    setSelectedRestaurant(value);
  }

  function onSearchByName(value) {
    setSearchText(value);
    if (value) {
      if (selectedRestaurant) {
        const _data = defaultData.filter((item) =>
          item.categories.includes(selectedRestaurant.name)
        );
        const data = _data.filter((item) =>
          item.name.toLocaleLowerCase().includes(value.toLowerCase())
        );
        setDataPlaceList(data);
        setRowDataPlace(data.slice(0, 9));
      } else {
        const data = defaultData.filter((item) =>
          item.name.toLocaleLowerCase().includes(value.toLowerCase())
        );
        setDataPlaceList(data);
        setRowDataPlace(data.slice(0, 9));
      }
      setFirst(0);
    } else {
      if (selectedRestaurant) {
        const data = defaultData.filter((item) =>
          item.categories.includes(selectedRestaurant.name)
        );
        setDataPlaceList(data);
        setRowDataPlace(data.slice(0, 9));
      } else {
        setDataPlaceList(defaultData);
        setRowDataPlace(defaultData.slice(0, 9));
      }
      setFirst(0);
    }
  }
  return (
    <div style={{ padding: "20px 20px" }}>
      <div id="top-content">
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Place List</p>
        <div style={{ display: "flex" }}>
          <Dropdown
            className="custominput"
            value={selectedRestaurant}
            onChange={(e) => onSelectedRestaurant(e.value)}
            options={categories}
            optionLabel="name"
            placeholder="Select a Restaurant"
            pt={{ root: { style: { display: "flex", alignItems: "center" } } }}
            style={{ borderRadius: "30px" }}
          />
          <Divider layout="vertical" />
          <InputText
            className="custominput"
            value={searchText}
            placeholder="Search Name"
            style={{ borderRadius: "30px" }}
            onChange={(e) => onSearchByName(e.target.value)}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gridTemplateRows: "1fr 1fr 1fr",
          gap: "20px",
          height: "70vh",
          overflowY: "auto",
          marginTop: "5px",
        }}
      >
        {rowDataPlace.map((item) => cardContent(item))}
      </div>
      <Paginator
        style={{ position: "sticky", bottom: "0px" }}
        first={first}
        rows={rows}
        totalRecords={dataPlaceList.length}
        onPageChange={onPageChange}
      />
      {dataDialog?<Detail data={dataDialog} vasible={dialog} onHide={()=>setDialog(false)}></Detail>:null}
      
    </div>
  );
}
