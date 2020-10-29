import React from 'react'

export default function Home() {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>minn maw oo</h5>
                <div className="image-card">
                    <img src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>
                </div>
                <div className="card-content">
                    <i className="material-icons" style={{color: "red"}}>favorite</i>
                    <h6>title</h6>
                    <p>this is amazing photo</p>
                    <input type="text" placeholder="add comment"/>
                </div>
            </div>
        </div>
    )
}
