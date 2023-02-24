import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectRequestForm from "./ProjectRequestForm";
import AdminDashBoard from "./AdminDashBoard";
import { Tabs, Tab } from 'react-bootstrap';

interface IApp {
  userDisplayName: string;
}

const App: React.FC<IApp> = ({ userDisplayName }) => {

  const [key, setKey] = useState('tab1');

  return (
    <Container>
      <Tabs id="my-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab eventKey="tab1" title="Tab 1">
          <ProjectRequestForm userDisplayName={userDisplayName}></ProjectRequestForm>
        </Tab>
        <Tab eventKey="tab2" title="Tab 2">
          <AdminDashBoard></AdminDashBoard>
        </Tab>
      </Tabs>



    </Container>
  )
}
export default App;