import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import MainDisplay from "./components/maindisplay";
function App() {
  const [count, setCount] = useState(0);
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );

  const end = (
    <div >
  
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );
  return (
    <>
      <Menubar style={{backgroundColor:'#134B8A',position:'sticky'}}  end={end} />
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          height: "100vh",
          width: "80px",
          backgroundColor:'white',
          borderRadius:'0px 8vh 0px 0px',
        }}
      >
       <div style={{width:'100%',height:'100px',display:'flex',justifyContent:'center',alignItems:'center'}}>
       <i className="pi pi-times"></i>
        </div>
       <div>

       </div>
      </div>
      <div style={{position: "fixed",left:'80px',width:'calc(100% - 80px)',backgroundColor:'#E0EDED'}}>
      <MainDisplay></MainDisplay>
      </div>
    </>
  );
}

export default App;
