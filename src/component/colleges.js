import React from 'react'
import lists from '../colleges.json'
import colImg from '../images/college_02.jpg'
import colStyles from './colleges.css'

class colleges extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:[],
             hasMore: true,
             message: '',
             items: 10,
             initial: 0
        }
        this.scrollEnd = this.scrollEnd.bind(this)
    }

    

    scrollEnd() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({
                message: 'bottom reached',
                items: this.state.items + 10,
                initial: ++this.state.items,
                data :[
                    ...this.state.data,
                    ...lists.colleges.slice(this.state.initial ,this.state.items)
                ]
            });
        }
    }

    componentDidMount() {
        this.setState({
            data: lists.colleges.slice(this.state.initial, this.state.items)
        })
        window.addEventListener("scroll", this.scrollEnd);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.scrollEnd);
    }

    
    render() {
       const jsonData = this.state.data
       console.log(this.state.message)
        return (
            <div>
                <p className="title">Colleges in noth india</p>
                <div className="main-container"  >
                    { jsonData .map( (data, index)=>{
                        return <div className="college-block" key={index} onScroll={this.scrollEnd}>
                        <div className="image-section">
                            <img src={colImg} alt="college" width="100%"/>
                            <div className="background-layer"></div>
                            <span className="flag-discount">promoted</span>
                            <div className="college-rate">
                                <span className="rating-value">{data.rating}</span><span>/5</span><br/>
                                <span>{data.rating_remarks}</span>
                            </div>
                            <div className="college-dist">
                                <span className="college-badge">{data.tags[0]}</span>
                                <span className="college-badge">{data.tags[1]}</span>
                                <div className="college-rank">
                                <span>{data.ranking}</span>
                                </div>
                            </div>
                        </div>
                        <div className="info-section">
                            <div className="info1">
                                <h3 className="college-title">{data.college_name}</h3>
                                <p className="near-place">{data.nearest_place[0]} | <span style={{'color': 'adadad'}}>{data.nearest_place[1]}</span></p>
                                <p className="extact-place"><span>93% match:</span> {data.famous_nearest_places}</p>
                                <p className="offer">{data.offertext}</p>
                            </div>
                            <div className="info2">
                                <s className="discount-price">&#x20B9;{data.original_fees}</s><span className="discount">{data.discount}</span>
                                <h2 className="fee-price"> &#x20B9; {data.discounted_fees}</h2>
                                <p className="fee-structure">{data.fees_cycle}</p>
                                <p className="cancelText">{data.amenties[0]} {data.amenties[1]}</p>
                            </div>
                        </div>
                    </div>})
                    }
                </div>
            </div>
        )
    }
}

export default colleges
