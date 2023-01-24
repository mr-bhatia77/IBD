import * as React from 'react';
import { IIbdProps } from './IIbdProps';
import { escape } from '@microsoft/sp-lodash-subset';
import App from './App';

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
      <div><h2>Well done, {escape(userDisplayName)}!</h2>
      <App userDisplayName={userDisplayName}></App></div>
    );
  }
}
