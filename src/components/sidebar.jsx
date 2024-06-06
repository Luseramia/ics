import logo1 from '../assets/img/st,small,507x507-pad,600x600,f8f8f8.jpg'
import logo2 from '../assets/img/Fromis_9_logo_(ICON).svg.png'
import { Divider } from 'primereact/divider';
export default function SideBar() {
  return (
    <div
        id="sidebar"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100vh",
          width: "80px",
          borderRadius:'0px 8vh 0px 0px',
          padding:'5px 10px'
        }}
      >
        <img src={logo1} style={{width:'50px',borderRadius:'10px',marginTop:'1rem'}} alt="logo1" />
      <Divider></Divider>
      <img src={logo2} style={{width:'50px',borderRadius:'10px',marginTop:'1rem'}} alt="logo1" />
      <Divider></Divider>
      </div>
   
  );
}
