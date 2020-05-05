import { curry, memoize } from 'lodash';
import React, { Component } from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import styled from 'styled-components';

const ControlsRow = styled.div`
  width: 100%;
  height: 3em;

  display: flex;
  align-items: right;
  justify-content: flex-end;
`;

const ControlContainer = styled.div`
  padding-right: 1em;
`;

const Controls = styled.div`
  display: table;
  > svg {
    cursor: pointer;

    height: 2em;
    width: 2em;

    color: ${(props) => props.theme.border.default};
    fill: ${(props) => props.theme.border.default};

    &:hover {
      color: ${(props) => props.theme.border.dark};
      fill: ${(props) => props.theme.border.dark};
    }

    &:nth-child(2) {
      margin-right: 0.75em;
      vertical-align: middle;
    }

    &:last-child {
      margin-left: 0.75em;
      vertical-align: middle;
    }
  }
`;

const Entries = styled.select`
  width: 6em;
  height: 2em;

  vertical-align: middle;
  margin-right: 1em;
  margin-top: 0.1em;

  border: 0.1em solid ${(props) => props.theme.border.default};
  background-color: ${(props) => props.theme.background.dark};
  color: ${(props) => props.theme.text.icons};

  &active,
  &:focus {
    outline: none;
  }
`;

const Entry = styled.option``;

const Pages = styled.div`
  display: table-cell;
  vertical-align: middle;

  > div:first-child {
    border-radius: 0.5em 0em 0em 0.5em;
  }
  > div:last-child {
    border-radius: 0em 0.5em 0.5em 0em;
  }
`;

interface IPage {
  selected: boolean;
  single: boolean;
}
const Page = styled.div<IPage>`
  display: table-cell;
  vertical-align: middle;
  padding: 0.4em 0.5em;

  border: 0.1em solid ${(props) => props.theme.border.default};

  cursor: pointer;

  color: ${(props) => props.theme.text.primaryAlt};

  ${(props) => {
    let css = '';

    if (props.selected) {
      const { background, text } = props.theme;
      css =
        css +
        `
      
        color: ${text.icons};
        background-color: ${background.dark};
      `;
    }

    css = props.single ? css + 'border-radius: 0.5em !important;' : css;

    return css;
  }}
`;

const ChildrenContainer = styled.div`
  min-height: 38em;
  height: fit-content;
  margin: 2em 0em;
`;

// TODO: USE A PREMADE PAGINATION COMPONENT OR ADD FILTER CAPABILITY TO THIS COMPONENT
interface IPagination {
  children: JSX.Element[];
}
class Pagination extends Component<IPagination> {
  page: number = 0;
  entries: number = 10;

  get startIndex() {
    return this.page * this.entries;
  }

  get endIndex() {
    return this.page * this.entries + this.entries;
  }

  get selectedPage() {
    return this.page + 1;
  }

  get totalPages() {
    const children = this.props.children.length;

    let pages = Math.floor(children / this.entries);
    if (children % this.entries !== 0) {
      pages++;
    }
    return pages;
  }

  render() {
    return (
      <>
        {this.renderControls()}

        <ChildrenContainer>
          {this.props.children.slice(this.startIndex, this.endIndex)}
        </ChildrenContainer>

        {this.renderControls()}
      </>
    );
  }

  renderControls = () => {
    const pages = [];
    for (let page = 1; page <= this.totalPages; page++) {
      // TODO: ADD BETTER PAGE NUMBERING IN ADVANCED VERSION
      pages.push(
        <Page
          onClick={this.setPage(page)}
          selected={this.selectedPage === page}
          single={this.totalPages === 1}
        >
          {page}
        </Page>
      );
    }

    return (
      <ControlsRow>
        <ControlContainer>
          <Controls>
            <Entries onChange={this.setNbrOfEntries}>
              <Entry value={10}>10</Entry>
              <Entry value={25}>25</Entry>
              <Entry value={50}>50</Entry>
            </Entries>
            <FaRegArrowAltCircleLeft onClick={this.decrPage} />
            <Pages>{pages}</Pages>
            <FaRegArrowAltCircleRight onClick={this.incrPage} />
          </Controls>
        </ControlContainer>
      </ControlsRow>
    );
  };

  setPage = memoize(
    curry(
      (page: number, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.page = --page;
        this.forceUpdate();
      }
    )
  );

  incrPage = () => {
    if (this.endIndex >= this.props.children.length) {
      return;
    }

    this.page++;
    this.forceUpdate();
  };

  decrPage = () => {
    if (this.page === 0) {
      return;
    }

    this.page--;
    this.forceUpdate();
  };

  setNbrOfEntries = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEntries = parseInt(event.target.value);
    if (newEntries !== this.entries) {
      this.page = 0;
    }

    this.entries = newEntries;

    this.forceUpdate();
  };
}

export default Pagination;
