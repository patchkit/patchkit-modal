import React from 'react'
import ModalSingle from './single'
import ModalFlow from './flow'

export default class ModalBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isOpen: false }
    this.on = {
      open: () => { this.setState({ isOpen: true }) },
      close: (err, value) => { 
        this.setState({ isOpen: false })
        this.props.onClose && this.props.onClose(err, value)
      }
    }
  }
  render() {
    var Modal = ModalSingle
    if (this.props.Forms)
      Modal = ModalFlow
    return <span>
      <span onClick={this.on.open}>
        {this.props.children}
      </span>
      <Modal {...this.props} isOpen={this.state.isOpen} onClose={this.on.close} />
    </span>
  }
}