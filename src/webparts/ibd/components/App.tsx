import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { Container } from 'react-bootstrap';
import ProjectRequestForm from "./ProjectRequestForm";

interface IApp {
  userDisplayName: string;
}

const App: React.FC<IApp> = ({ userDisplayName }) => {

  return (
    <Container>
      <div className="tab-content">
          <ProjectRequestForm userDisplayName={userDisplayName}></ProjectRequestForm>
          </div>
    </Container>
  )
}
export default App;