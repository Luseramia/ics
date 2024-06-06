import { Avatar } from "primereact/avatar";
import { Menubar } from "primereact/menubar";
export default function Header() {
    const end = (
        <div style={{display:'flex',alignItems:'center',paddingRight:'1rem'}}>
            <i className="pi  pi-bell" style={{ fontSize: '2rem',color:'white',paddingRight:'1rem' }}></i>
          <Avatar
            image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
            shape="circle"
          />
           <p style={{color:'white',paddingLeft:'1rem'}}>Name</p>
           <i className="pi  pi-angle-down" style={{ fontSize: '1rem',color:'white',paddingLeft:'1rem' }}></i>
        </div>
      );
  return (
    <div>
      <Menubar
        style={{ backgroundColor: "#134B8A", position: "sticky" }}
        end={end}
      />
    </div>
  );
}
