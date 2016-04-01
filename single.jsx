import React from 'react'

export default class ModalSingle extends React.Component {
  static propTypes = {
    Form: React.PropTypes.func.isRequired
  }
  static contextTypes = {
    emit: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.com = null
    this.state = {
      isHighlighted: true,
      isValid: false,
      helpText: false
    }
  }

  onCancelClick() {
    this.props.onClose && this.props.onClose(false, false)
  }

  onNextClick() {
    if (!this.state.isValid)
      return

    const done = err => {
      if (err)
        this.context.emit('error', err)
      this.props.onClose && this.props.onClose(err, true)
    }

    if (this.refs.form.submit)
      this.refs.form.submit(done)
    else
      done()
  }

  render() {
    const nextLabel = this.props.nextLabel || 'Finish'
    const cancelLabel = this.props.cancelLabel || 'Cancel'
    var Form = this.props.Form
    if (!this.props.isOpen || !Form)
      return <span/>
   
    var nextCls = ['btn']
    if (!this.state.isValid)
      nextCls.push('disabled')
    else if (this.state.isHighlighted)
      nextCls.push('highlighted')

    const setHelpText = helpText => { this.setState({ helpText: helpText }) }
    const setIsValid = isValid => { this.setState({ isValid: isValid }) }
    const setIsHighlighted = isHighlighted => { this.setState({ isHighlighted: isHighlighted }) }

    return <div className={'modal modal-single '+(this.props.className||'')}>
      <div className="modal-inner">
        <div className="modal-content">
          <Form ref="form" setIsHighlighted={setIsHighlighted} setIsValid={setIsValid} setHelpText={setHelpText} {...this.props.formProps} />
        </div>
        { this.state.helpText ? <div className="modal-helptext">{this.state.helpText}</div> : '' }
        <div className="modal-ctrls">
          <div className="cancel">
            <button className="btn" onClick={this.onCancelClick.bind(this)}>
              <i className="fa fa-remove" /> {cancelLabel}
            </button>
          </div>
          <div className="next">
            <button disabled={!this.state.isValid} className={nextCls.join(' ')} onClick={this.onNextClick.bind(this)}>
              {nextLabel} <i className="fa fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  }
}