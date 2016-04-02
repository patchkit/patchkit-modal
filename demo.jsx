import React from 'react'
import Single from './single'
import Flow from './flow'
import Btn from './btn'

class StaticModal extends React.Component {
  componentDidMount() {
    this.props.setIsHighlighted(true)
    this.props.setIsValid(true)
  }
  submit(cb) {
    console.log('doing submit logic')
    cb()
  }
  render() {
    return <div style={{marginBottom: '4em'}}>
      <h1>Modal</h1>
      <p>This is the modal content</p>
    </div>
  }
}

class ModalForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: ''
    }
  }
  componentDidMount() {
    this.props.setIsHighlighted(true)
    this.validate()
  }
  validate() {
    this.props.setIsValid(!!this.state.inputValue)
    this.props.setHelpText(!this.state.inputValue ? 'Help Text: Type some text to make the form valid' : 'Help Text: You can now press Finish!')
  }
  submit(cb) {
    console.log('doing submit logic')
    cb()
  }
  render() {
    const onInputChange = e => {
      this.setState({ inputValue: e.target.value }, this.validate.bind(this))
    }
    return <div style={{marginBottom: '4em'}}>
      <form>
        <h1>Modal Form</h1>
        <p><label>What is your name?<br/><input type="text" onChange={onInputChange} value={this.state.inputValue} /></label></p>
      </form>
    </div>
  }
}

class StaticModal1 extends StaticModal {
  render() {
    return <div style={{marginBottom: '4em'}}>
      <h1>Modal 1</h1>
      <p>This is the first modal</p>
    </div>
  }
}
class StaticModal2 extends StaticModal {
  render() {
    return <div style={{marginBottom: '4em'}}>
      <h1>Modal 2</h1>
      <p>This is the second modal</p>
    </div>
  }
}
class StaticModal3 extends StaticModal {
  render() {
    return <div style={{marginBottom: '4em'}}>
      <h1>Modal 3</h1>
      <p>This is the third modal</p>
    </div>
  }
}

export default class ModalDemo extends React.Component {
  render() {
    const onClose = (err, res) => console.log('Closed', err, res)
    return <div>
      <h1>patchkit-modal</h1>
      <section className="modal-btn-single-fullheight-static">
        <header>&lt;Btn Form=StaticModal className="fullheight"&gt; (static content)</header>
        <div className="content"><Btn Form={StaticModal} className="fullheight" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
      <section className="modal-btn-single-center-block-static">
        <header>&lt;Btn Form=StaticModal className="center-block"&gt; (static content)</header>
        <div className="content"><Btn Form={StaticModal} className="center-block" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
      <section className="modal-btn-single-fullheight-form">
        <header>&lt;Btn Form=ModalForm className="fullheight"&gt; (with form)</header>
        <div className="content"><Btn Form={ModalForm} className="fullheight" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
      <section className="modal-btn-single-center-block-form">
        <header>&lt;Btn Form=ModalForm className="center-block"&gt; (with form)</header>
        <div className="content"><Btn Form={ModalForm} className="center-block" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
      <section className="modal-btn-flow-fullheight-static">
        <header>&lt;Btn Forms=[StaticModal1,StaticModal2,StaticModal3] labels=["First","Second","Third"] className="fullheight"&gt; (static content)</header>
        <div className="content"><Btn Forms={[StaticModal1,StaticModal2,StaticModal3]} labels={["First","Second","Third"]} className="fullheight" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
      <section className="modal-btn-flow-center-block-static">
        <header>&lt;Btn Forms=[StaticModal1,StaticModal2,StaticModal3] labels=["First","Second","Third"] className="center-block"&gt; (static content)</header>
        <div className="content"><Btn Forms={[StaticModal1,StaticModal2,StaticModal3]} labels={["First","Second","Third"]} className="center-block" onClose={onClose}><a btnClassName="btn highlighted">Click to open</a></Btn></div>
      </section>
    </div>
  }
}