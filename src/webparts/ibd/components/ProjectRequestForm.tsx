import * as React from "react";
import { useState, useEffect } from "react";
import { Button,Row,Col,Alert } from "react-bootstrap";
import EditForm from "./EditForm";
import RequestForm from "./RequestForm";
import AxiosInstance from "../services/AxiosInstance";
import { compare } from "../services/commonFunctions";
interface IProjectRequestForm {
  userDisplayName: string;
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({
  userDisplayName,
}) => {
  const [isNewRequest, setIsNewRequest] = useState<boolean>(true);
  const [dataList, setDataList] = useState({
    projectList: [],
    instituteList: [],
    sampleList: [],
  });
  const [errorState,setErrorState] = useState<boolean>(false);

  useEffect(() => {
    Promise.all([
      AxiosInstance.get("/projectList/fetchData"),
      AxiosInstance.get("/instituteList/fetchData"),
      AxiosInstance.get("/sampleInfoList/fetchData"),
    ])
      .then((res: any) => {
        const newDataList: any = {
          projectList: res[0]?.data,
          instituteList: res[1]?.data,
          sampleList: res[2]?.data.sort((a: any, b: any) =>
            compare(a.sampleName, b.sampleName)
          ),
        };
        setDataList(newDataList);
      })
      .catch((error: any) => {
        setErrorState(true);
        console.log(error);
      });
  }, []);

  return (
    <div className="boxShadow">
      <h2 className="mainPageHeading mb-3">
        {isNewRequest ? "Raise" : "Edit"} Project Request
      </h2>
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
      <Row className="mt-3 mb-3">
            <Col xs={{span:10,offset:1}}>
              {errorState && (
                <Alert
                  variant="danger"
                  onClose={() => setErrorState(false)}
                  dismissible
                >
                  <p>
                    Looks like something went wrong! Try reloading the page or
                    contact admin.
                  </p>
                </Alert>
              )}
            </Col>
          </Row>
      {isNewRequest && (
        <RequestForm
          projectList={dataList.projectList}
          instituteList={dataList.instituteList}
          allSampleList={dataList.sampleList}
          setErrorState={setErrorState}
          setDataList={setDataList}
        ></RequestForm>
      )}
      {!isNewRequest && (
        <EditForm
          projectList={dataList.projectList}
          instituteList={dataList.instituteList}
          allSampleList={dataList.sampleList}
          setErrorState={setErrorState}
        ></EditForm>
      )}
    </div>
  );
};

export default ProjectRequestForm;
