import React, { Component, Fragment } from 'react'
import Message from '../components/Message'
import Progress from "../components/Progress"
import axios from "axios"
export default class newProduct extends Component {
    state = {
        nsnNo: "",
        seriNo: "",
        name: "",
        aciklama: "",
        file: "",
        uploadPercentage: 0,
        message: ""

    }
    onChange = (e) => {
        this.setState({ file: e.target.files[0] })
    }
    onDegisim=(e)=>{
        const name = e.target.name
        const value = e.target.value
        this.setState({
            [name]:value
        })
    }
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);
        formData.append('nsnNo', this.state.nsnNo);
        formData.append('seriNo', this.state.seriNo);
        formData.append('name', this.state.name);
        formData.append('aciklama', this.state.aciklama);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    this.setState({
                        uploadPercentage: parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    })
                    this.setState({
                        nsnNo: "",
                        seriNo: "",
                        name: "",
                        aciklama: "",
                        file: ""                                            
                        
                    })

                    // Clear percentage
                 
                    setTimeout(() =>
                   
                        this.setState({
                          
                            uploadPercentage: 0,                           
                            
                        }), 3000);
                }
            });
        }
        catch (err) {
            if (err.response.status === 500) {
                this.setState({ message: "There was a problem with the server" })

            } else {
                this.setState({ message: err.response.data.msg })

            }
        }
    }
    render() {

        return (
            <div className="container">
                <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' /> Yeni Urun Ekleme
    </h4>
                {this.state.message ? <Message msg={this.state.message} /> : null}

                <form className="shadow-lg p-5 bg-light rounded " onSubmit={this.onSubmit}>
                <div className='custom-file'>
                        <input
                            type='file'
                            className='custom-file-input '
                            id='customFile'
                            onChange={this.onChange}
                        />
                        <label className='custom-file-label' htmlFor='customFile'>
                            {this.state.file.name}
                        </label>
                    </div>
                    <div className="row mt-5" >
                        <div className="col-md-6 pt-2">
                            <label htmlFor="exampleFormControlInput1">NSN NO</label>
                            <input name="nsnNo" onChange={this.onDegisim} value={this.state.nsnNo}
                                type="text" className="form-control" placeholder="NSN No Giriniz" />
                        </div>
                        <div className="col-md-6 pt-2">
                            <label htmlFor="exampleFormControlInput1">SERI NO</label>
                            <input name="seriNo" onChange={this.onDegisim} value={this.state.seriNo}
                                type="text" className="form-control" placeholder="Seri No Giriniz" />
                        </div>
                    </div>

                    <div className="row mt-5 mb-4" >
                        <div className="col-md-6 pt-2">
                            <label htmlFor="exampleFormControlInput1">İsim</label>
                            <input name="name" onChange={this.onDegisim} value={this.state.name}
                                type="text" className="form-control" placeholder="Urun adini giriniz" />
                        </div>
                        <div className="col-md-6 pt-2">
                            <label htmlFor="exampleFormControlInput1">Urun Hakkında</label>
                            <textarea name="aciklama" onChange={this.onDegisim}
                                value={this.state.aciklama}
                                className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                        </div>
                    </div>

                 

                    <Progress percentage={this.state.uploadPercentage} />
                    <input
                        type='submit'
                        value='Upload'
                        className='btn btn-primary btn-block mt-4'
                    />
                </form>
            </div>

        )
    }
}
