import * as React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import EditForm from "./EditForm";
import RequestForm from "./RequestForm";
interface IProjectRequestForm {
  userDisplayName: string;
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({
  userDisplayName,
}) => {
  
  const [isNewRequest, setIsNewRequest] = useState<boolean>(true);
  // const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  return (
    <div className="boxShadow">
      <h2 className="mainPageHeading mb-3">{isNewRequest? 'Raise' : 'Edit'} Project Request</h2>
      <div className="flex alignCenter">
        <Button
          className={
            isNewRequest
              ? "button1 buttonSelected"
              : "button1 buttonNotSelected"
          }
          onClick={() => setIsNewRequest(true)}
        >
          Raise New Request
        </Button>
        <Button
          className={
            isNewRequest
              ? "button2 buttonNotSelected"
              : "button2 buttonSelected"
          }
          onClick={() => setIsNewRequest(false)}
        >
          Edit Existing Request
        </Button>
      </div>
      {isNewRequest && <RequestForm></RequestForm>}
      {!isNewRequest && <EditForm></EditForm>}
    </div>
  );
};

export default ProjectRequestForm;
