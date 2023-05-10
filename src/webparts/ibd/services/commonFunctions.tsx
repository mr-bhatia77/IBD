import * as React from 'react';

export const instituteNameOptionsMaker = (instituteList: any[]) => {
    const instituteListOptions: any[] = [
        <option value="Select Institute" className="boldItalicText">Select Institute</option>,
        <option value="AddNew" className="blueItalicText">Other</option>
    ];
    if (instituteList?.length) {
      instituteList.forEach((item: any) => {
        item && instituteListOptions.push(
          <option value={item.instituteId}>{item.instituteName}</option>
        );
      });
    }
    instituteListOptions.push(<option value="AddNew" className="blueItalicText">other</option>)
    return instituteListOptions;
  };

  export const projectNameOptionsMaker = (projectList: any[]) => {
    const projectListOptions: any[] = [
        <option value="Select Project" className="boldItalicText">Select Project</option>
    ];
    if (projectList?.length) {
      projectList.forEach((item: any) => {
        item && projectListOptions.push(
          <option value={item.projectId}>{item.projectName}</option>
        );
      });
    }
    return projectListOptions;
  };

  export  const compare = (a: any, b: any) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  };

  export const findSampleTypes = (sampleList: any[]) => {
    const sampleTypeHashMap:{[key:string]:any} = {};
    sampleList?.forEach((sample:any)=>{
      sampleTypeHashMap[`${sample.sampleType}`]=1
  })
  return Object.keys(sampleTypeHashMap);
  }

  export const sampleListOptionsMaker =(sampleList:any[], sampleType:string)=> {
    const sampleListOptions: any[] = [
      <option value="Select Sample" className="boldItalicText">Select Sample</option>
  ];
  if (sampleList?.length) {
    sampleList.forEach((item: any) => {
      // console.log(item)
      item && (item.sampleType === sampleType) && sampleListOptions.push(
        <option value={item.sampleName}>{item.sampleName}</option>
      );
    });
  }
  return sampleListOptions;
  }