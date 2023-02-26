import * as React from 'react';

export const siteNameOptionsMaker = (siteNameList: any[]) => {
    const siteNameOptions: any[] = [
        <option value="Select Site Name" className="boldItalicText">Select Site Name</option>
    ];
    if (siteNameList?.length) {
      siteNameList.forEach((item: any) => {
        item && siteNameOptions.push(
          <option value={item.eventName}>{item.eventName}</option>
        );
      });
    }
    return siteNameOptions;
  };