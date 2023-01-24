import * as React from 'react';
import { IIbdProps } from './IIbdProps';
import App from './App';
import "./App.css";

export default class Ibd extends React.Component<IIbdProps, {}> {
  public render(): React.ReactElement<IIbdProps> {
    const {
      // description,
      // isDarkTheme,
      // environmentMessage,
      // hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div className='boxShadow'><h2 className='mainPageHeading'>Raise Project Request</h2>
      <App userDisplayName={userDisplayName}></App></div>
    );
  }
}
