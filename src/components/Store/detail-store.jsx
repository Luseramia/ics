import { Dialog } from "primereact/dialog";

export default function Detail(props) {
   const data = props.data
  return (
    <>
      <Dialog
        header={data.name}
        visible={props.vasible}
        style={{ width: "50vw" }}
        onHide={() => props.onHide()}
      >
        <p style={{fontSize:'1.3rem',margin:'0px'}}>ที่อยู่</p>
        <p className="m-0">
          {data.address}
        </p>
      </Dialog>
    </>
  );
}
