import React, { Component } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import MachinesList from "../MachinesList/MachinesList";
import NotFound from "../../404/404";

class MachinesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: undefined,
      currentPage: undefined,
      MachinesList: []
    };
  }

  async loadMachinesById(pageId) {
    const Page = pageId;
    const url = `machine/?offset=${20 * pageId}`;
   //alert(url);
    const response = await axiosInstance.get(url);
    const resultList = response.data.results;
    const count = response.data.count;
    // const maxPage = Math.ceil((this.state.count / 20) - 1);
    this.setState({ MachinesList: resultList, currentPage: Page, count: count});
  }

  async componentWillMount() {
    const pageId = this.props.match.params.page;
    await this.loadMachinesById(pageId);
  }

  async componentWillReceiveProps(nextProps) {
    // alert(`currentPageId=${nextProps.match.params.page},   oldPageId=${this.props.match.params.page}`);
    const currentPageId = nextProps.match.params.page;
    const oldPageId = this.props.match.params.page;

    if (currentPageId !== oldPageId) {
      await this.setState({currentPage : currentPageId});
      await this.loadMachinesById(currentPageId);
    }
  }

  render() {
      // alert("Hello -- ");
        if( 61 < this.props.match.params.page ) {
            return <NotFound/>;
        }
        let paginationDisplay = null;
        
        if(this.state.MachinesList.length !== 0) {
          if(this.state.currentPage === 0) {
            paginationDisplay = (
              <section>
                <ul class="pager">
                  <li class="disabled"><span>&larr;Previous</span></li>
                  <li><Link to={`/machines/page/${(parseInt(this.state.currentPage, 10) + 1).toString()}`}>Next&rarr;</Link></li> 
                </ul> 
              </section>
            );
          } else if (this.state.currentPage === Math.ceil(this.state.count / 20) - 1) {
            paginationDisplay = (
              <section>
                <ul class="pager">
                  <li><Link to={`/machines/page/${(parseInt(this.state.currentPage, 10) - 1).toString()}`}>&larr;Previous</Link></li>
                  <li class="disabled"><span>Next&rarr;</span></li>
                </ul> 
              </section>
            );
          } else {
            paginationDisplay = (
              <section>
                <ul class="pager">
                  <li><Link to={`/machines/page/${(parseInt(this.state.currentPage, 10) - 1).toString()}`}>&larr;Previous</Link></li>
                  <li><Link to={`/machines/page/${(parseInt(this.state.currentPage, 10) + 1).toString()}`}>Next&rarr;</Link></li> 
                </ul>
              </section>
            );
          };
        }

      return ( 
          <div className="pokemon-page">
              <MachinesList machines={this.state.MachinesList} />
              {paginationDisplay}
          </div>
      );
    }
  
}

export default MachinesPage;
