import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDdtHgdRWAGZ1EeB00gPKLZoY8T2UPy8UE';


// Create a new component. This component should produce some HTML
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboards');
    }

    videoSearch(term){
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
                <VideoList
                    onVideoSelect = { selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
                <VideoDetail
                    video={this.state.selectedVideo}/>
            </div>);
    }

}


// Take this component's generated HTML and put in on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));
