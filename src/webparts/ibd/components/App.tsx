import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectRequestForm from "./ProjectRequestForm";
import ProjectRequestForm2 from "./ProjectRequestForm2";
// import ProjectRequestForm2 from "./ProjectRequestForm2";
import AdminDashBoard from "./AdminDashBoard";
import { Tabs, Tab } from 'react-bootstrap';
// import SearchBox  from "./SearchBox";
// import DynamicTable from "./DynamicTable";

interface IApp {
  userDisplayName: string;
}

const App: React.FC<IApp> = ({ userDisplayName }) => {

  const [key, setKey] = useState('tab1');

  return (
    <Container>
      <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="tab1" title="Raise Sample Request">
          <ProjectRequestForm userDisplayName={userDisplayName}></ProjectRequestForm>
        </Tab>
         <Tab eventKey="tab2" title="IBD BioSample Mapping">
          <AdminDashBoard></AdminDashBoard>
        </Tab>
        {/* <Tab eventKey="tab3" title="SearchBox">
          <SearchBox></SearchBox>
        </Tab>
        <Tab eventKey="tab4" title="DynamicTable">
          <DynamicTable></DynamicTable>
        </Tab> */}
        <Tab eventKey="tab4" title="DynamicTable">
          <ProjectRequestForm2 userDisplayName={userDisplayName}></ProjectRequestForm2>
        </Tab>
      </Tabs>
    </Container>
  )
}
export default App;