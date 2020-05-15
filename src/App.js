import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      artist: '',
      result: [],
      error: false,
    }
  }

  handleChange = (e) => {
    if(e.target.value !== ""){
      this.setState({
        artist:e.target.value,
        error:false
      })
    }
  }

  searchArtist = () => {
    if(this.state.artist === ""){
      this.setState({
        error:true
      })
    } else {
      fetch("https://itunes.apple.com/search?term=" + this.state.artist)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.results);
          this.setState({
            result:result.results
          });
        },
      )
    }
  }

  render(){
    console.log(this.state);
    return (
      <div className="App">
        <header className="">
          <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="form-group">
              <input type="type" className="form-control" value={this.state.artist} onChange={this.handleChange} placeholder="Enter Artist Name" />
              {this.state.error &&
                <div>
                  <span style={{color: 'red'}}>Please enter the Artist name.</span>
                </div>
              }
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.searchArtist}>Search</button>
          </div>
          </div>

          <div>
            <div style={{display: 'flex', flexFlow: 'wrap'}}>
            {this.state.result.length !== 0 && this.state.result.map((artist, index)=>{
                  return (
                      <div key={index} className="card col-4" style={{background: '#f5f5f5', padding: '10px', border: '15px solid white'}}>
                        <div style={{textAlign: 'center'}}>
                          <img src={artist.artworkUrl100} height="100" width="100"/>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">{artist.artistName}</h5>
                          <table className="table table-bordered">
                            <tbody>
                            <tr>
                              <td>collection Name</td>
                              <td>{artist.collectionName}</td>
                            </tr>
                            <tr>
                              <td>collection Price</td>
                              <td>{artist.collectionPrice}</td>
                            </tr>
                            <tr>
                              <td>Release Date</td>
                              <td>{artist.releaseDate}</td>
                            </tr>
                            <tr>
                              <td>Country</td>
                              <td>{artist.country}</td>
                            </tr>
                            <tr>
                              <td>Currency</td>
                              <td>{artist.currency}</td>
                            </tr>
                            <tr>
                              <td>Primary Genre Name</td>
                              <td>{artist.primaryGenreName}</td>
                            </tr>
                            <tr>
                              <td>Collection</td>
                              <td>{artist.collectionViewUrl}</td>
                            </tr>
                            </tbody>
                          </table>
                          <div>
                            {artist.copyright}
                          </div>
                        </div>
                      </div>
                  )
            })}
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
